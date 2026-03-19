// ─── AI AGENT CONFIGURATION ───────────────────────────────────────────────────
// Three agents: Quinn (Mom), Kane (Mekhi), Caleb (Melvin)
// ─────────────────────────────────────────────────────────────────────────────

export const AGENTS = {
  quinn: {
    id: 'quinn',
    name: 'Quinn',
    title: "Mom's Personal Life Coach",
    role: 'Strategist + Truth Anchor',
    userId: 'mom',
    color: '#3B82F6',
    colorName: 'blue',
    glowClass: 'shadow-blue-500/50',
    borderColor: 'border-blue-500/50',
    bgAccent: 'bg-blue-500/10',
    textAccent: 'text-blue-400',
    modelPath: '/avatars/quinn/avatar.glb',
    idleLines: [
      "Ready when you are.",
      "What do you need to work through?",
      "Let's figure out the next move.",
      "I'm here. What's on your mind?",
    ],
    thinkingLines: [
      "Processing what you shared…",
      "Let me break this down…",
      "Working through this…",
      "Looking at the full picture…",
    ],
    voice: { rate: 0.95, pitch: 1.05, volume: 1 },
    dashboardSections: ['summary', 'truth_breakdown', 'action_steps'],
  },

  kane: {
    id: 'kane',
    name: 'Kane',
    title: "Mekhi's Personal Life Coach",
    role: 'Accountability Coach',
    userId: 'mekhi',
    color: '#F59E0B',
    colorName: 'amber',
    glowClass: 'shadow-amber-500/50',
    borderColor: 'border-amber-500/50',
    bgAccent: 'bg-amber-500/10',
    textAccent: 'text-amber-400',
    modelPath: '/avatars/kane/avatar.glb',
    idleLines: [
      "What did you actually do today?",
      "I'm waiting. Stop stalling.",
      "Let's be real about where you are.",
      "You know what you need to do.",
    ],
    thinkingLines: [
      "Breaking this down…",
      "Let's be real about this…",
      "Getting straight to it…",
      "No filter. Here's what I see…",
    ],
    voice: { rate: 0.88, pitch: 0.9, volume: 1 },
    dashboardSections: ['summary', 'truth_breakdown', 'action_steps', 'accountability'],
  },

  caleb: {
    id: 'caleb',
    name: 'Caleb',
    title: "Melvin's Personal Life Coach",
    role: 'Support + Clarity Guide',
    userId: 'melvin',
    color: '#10B981',
    colorName: 'green',
    glowClass: 'shadow-emerald-500/50',
    borderColor: 'border-emerald-500/50',
    bgAccent: 'bg-emerald-500/10',
    textAccent: 'text-emerald-400',
    modelPath: '/avatars/caleb/avatar.glb',
    idleLines: [
      "Hey, what's going on?",
      "Let's figure this out together.",
      "What do you need help with today?",
      "I got you. What's the situation?",
    ],
    thinkingLines: [
      "Alright, let me think through this…",
      "Breaking it down for you…",
      "Give me a second…",
      "Working through it step by step…",
    ],
    voice: { rate: 0.92, pitch: 1.1, volume: 1 },
    dashboardSections: ['summary', 'truth_breakdown', 'action_steps', 'support_mode'],
  },
};

export function getAgent(agentId) {
  return AGENTS[agentId] || null;
}

export const AGENT_LIST = Object.values(AGENTS);
