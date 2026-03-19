// ─── CHAT SERVICE ─────────────────────────────────────────────────────────────
// Routes agent chat messages through the existing Netlify Claude proxy.
// ─────────────────────────────────────────────────────────────────────────────

import { AGENT_PROMPTS } from './agent-prompts.js';

/**
 * Send a message to an agent and get a response.
 * @param {string} agentId - 'quinn' | 'kane' | 'caleb'
 * @param {Array}  history - [{role, content}] conversation history
 * @param {string} userMessage - the new user message
 * @returns {Promise<{text: string, agentId: string, timestamp: string}>}
 */
export async function sendAgentMessage(agentId, history, userMessage) {
  const systemPrompt = AGENT_PROMPTS[agentId];
  if (!systemPrompt) throw new Error(`Unknown agent: ${agentId}`);

  const messages = [
    ...history,
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('/.netlify/functions/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: agentId,
      systemPrompt,
      messages,
      maxTokens: 400, // keep responses tight
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => 'Unknown error');
    throw new Error(`Agent API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  const text = data.content || data.text || '';

  return {
    text,
    agentId,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Parse an agent response into structured dashboard sections.
 * Uses the AI's natural language — we extract key parts heuristically.
 */
export function parseResponseForDashboard(text, agentId) {
  const lines = text.split('\n').filter(l => l.trim());

  // For short responses just use the whole thing as summary
  if (lines.length <= 3) {
    return {
      summary: text,
      truth_breakdown: null,
      action_steps: null,
      accountability: null,
      support_mode: null,
    };
  }

  // Try to detect sections from numbered lists or line breaks
  const actionKeywords = /^(action|step|do|next|move|today|now|\d+\.)/i;
  const truthKeywords  = /^(truth|reality|what'?s actually|here'?s what|the real|pattern|honest)/i;

  const summary       = lines.slice(0, 2).join(' ');
  const actionLines   = lines.filter(l => actionKeywords.test(l.trim()));
  const truthLines    = lines.filter(l => truthKeywords.test(l.trim()));
  const remaining     = lines.filter(l => !actionKeywords.test(l) && !truthKeywords.test(l)).slice(2);

  return {
    summary,
    truth_breakdown: truthLines.length ? truthLines.join('\n') : remaining.slice(0, 2).join('\n') || null,
    action_steps: actionLines.length ? actionLines.join('\n') : lines[lines.length - 1] || null,
    accountability: agentId === 'kane' ? (actionLines[0] || lines[lines.length - 1]) : null,
    support_mode: agentId === 'caleb' ? remaining.join('\n') || null : null,
  };
}
