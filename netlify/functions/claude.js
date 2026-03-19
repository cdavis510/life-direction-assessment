// ─── CLAUDE API PROXY ─────────────────────────────────────────────────────────
const Anthropic = require('@anthropic-ai/sdk');

const ALLOWED_USERS = ['mekhi', 'melvin', 'mom', 'quinn', 'kane', 'caleb'];
const MAX_TOKENS_CAP = 4096;
const MIN_TOKENS = 100;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { systemPrompt, messages, userId, maxTokens } = body;

  // Validate required fields
  if (!systemPrompt || !messages || !userId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields: systemPrompt, messages, userId' }) };
  }

  // Validate types
  if (!Array.isArray(messages) || messages.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'messages must be a non-empty array' }) };
  }

  // Validate user
  if (!ALLOWED_USERS.includes(userId)) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Unauthorized userId' }) };
  }

  // Clamp token limit
  const tokenLimit = Math.min(
    Math.max(Number(maxTokens) || MAX_TOKENS_CAP, MIN_TOKENS),
    MAX_TOKENS_CAP
  );

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: tokenLimit,
      system: systemPrompt,
      messages,
    });

    // Validate response structure before accessing
    if (!response?.content || !Array.isArray(response.content) || response.content.length === 0) {
      console.error('Unexpected Claude response structure:', JSON.stringify(response));
      return { statusCode: 502, body: JSON.stringify({ error: 'Unexpected response from AI provider' }) };
    }

    const textBlock = response.content.find(b => b.type === 'text');
    if (!textBlock) {
      return { statusCode: 502, body: JSON.stringify({ error: 'No text content in AI response' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: textBlock.text }),
    };
  } catch (err) {
    const status = err?.status || 500;
    const message = err?.message || 'Failed to get AI response';
    console.error(`Claude API error [${status}]:`, message);
    return {
      statusCode: status >= 400 && status < 600 ? status : 500,
      body: JSON.stringify({ error: message }),
    };
  }
};
