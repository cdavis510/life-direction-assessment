// ─── ResultsPreview — demo page to preview the dashboard ─────────────────────
// Route: /agents/results-preview
// Switch agent by changing PREVIEW_AGENT below: 'quinn' | 'kane' | 'caleb'
// ─────────────────────────────────────────────────────────────────────────────

import ResultsDashboard from './ResultsDashboard.jsx';
import { AGENTS } from '../../lib/ai-agents/agent-config.js';

// ← change this to 'kane' or 'caleb' to preview those themes
const PREVIEW_AGENT = 'quinn';

const DEMO = {
  quinn: {
    parsed: {
      summary:
        "Here's what's actually happening. The situation feels heavier than it is because pressure, delay, and emotional overload are stacking on top of each other. This is not a breakdown — it is a pattern that can be interrupted.",
      truth_breakdown:
        "The real issue is not lack of ability. It is a pattern of overwhelm leading to avoidance, and avoidance creating more pressure. The longer things sit, the larger they feel. The problem compounds not because you cannot handle it, but because starting feels impossible when the pile is already tall.",
      action_steps:
        "Avoiding hard tasks until pressure builds\nLetting emotion drive timing\nOverthinking instead of making the next clear move\nDelaying communication until it feels urgent",
      accountability:
        "You do not need a perfect plan before you move. You need an honest read of the situation and one intelligent step that restores momentum.\n\nWrite the full situation out in plain language\nSeparate urgent issues from emotionally loud issues\nComplete one concrete action before the end of today",
    },
  },
  kane: {
    parsed: {
      summary:
        "Let's be honest. You know exactly what needs to happen. The only question is whether you are going to do it today or keep waiting for the right moment that never comes.",
      truth_breakdown:
        "The pattern is clear. You start strong, you fade when it gets hard, and then you restart from zero. That cycle is costing you more than you realize. Potential means nothing without execution.",
      action_steps:
        "Starting with motivation instead of discipline\nFading when the task stops feeling interesting\nUsing busyness to avoid the main thing\nAvoiding accountability by staying vague",
      accountability:
        "No more warm-up laps. Pick the most important thing right now and do the first step in the next ten minutes.\n\nStop explaining the problem — start solving it\nSet a 25-minute focused block, now\nTell someone what you committed to doing today",
    },
  },
  caleb: {
    parsed: {
      summary:
        "Hey — you are not behind. You are figuring it out, and that is what this process is for. Let's get clear on what is actually going on and take the next step together.",
      truth_breakdown:
        "What is happening right now makes sense given everything you are carrying. The issue is not that you are weak — it is that you are trying to carry too much without enough structure. Let's break it down into smaller pieces.",
      action_steps:
        "Carrying too much without a system to organize it\nAvoiding the scary steps by staying in planning mode\nNot asking for help early enough\nLetting one setback affect the whole day",
      support_mode:
        "This is manageable. We just need a clear starting point and one honest next move.\n\nWrite down the three things that feel most stuck right now\nPick the one that would feel best to resolve first\nTake one small action — not the whole thing, just one step",
    },
  },
};

export default function ResultsPreview() {
  const agent  = AGENTS[PREVIEW_AGENT];
  const parsed = DEMO[PREVIEW_AGENT].parsed;

  return <ResultsDashboard parsed={parsed} agent={agent} />;
}
