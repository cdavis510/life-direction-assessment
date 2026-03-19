// ─── Agent theme map for results dashboard ────────────────────────────────────
// Reads colorName from agent-config — does NOT change any avatar colors.
// Quinn = blue, Kane = amber, Caleb = green (emerald)

export const THEMES = {
  blue: {
    glow:        'shadow-[0_0_0_1px_rgba(59,130,246,0.28),0_0_32px_rgba(59,130,246,0.12)]',
    heroBorder:  'border-blue-500/25',
    badge:       'bg-blue-500/15 text-blue-200 border border-blue-400/20',
    accent:      'text-blue-300',
    dot:         'bg-blue-300',
    stepBorder:  'border-blue-300/30 bg-blue-400/10 text-blue-200',
    barFill:     'bg-gradient-to-r from-blue-400 to-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    statusPill:  'bg-blue-500/15 text-blue-200 border border-blue-400/20',
    ring:        'focus:ring-1 focus:ring-blue-400/40',
    heroGradient:'from-blue-500/10 via-blue-400/4 to-transparent',
  },
  amber: {
    glow:        'shadow-[0_0_0_1px_rgba(245,158,11,0.28),0_0_32px_rgba(245,158,11,0.10)]',
    heroBorder:  'border-amber-500/25',
    badge:       'bg-amber-500/15 text-amber-200 border border-amber-400/20',
    accent:      'text-amber-300',
    dot:         'bg-amber-300',
    stepBorder:  'border-amber-300/30 bg-amber-400/10 text-amber-200',
    barFill:     'bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
    statusPill:  'bg-amber-500/15 text-amber-200 border border-amber-400/20',
    ring:        'focus:ring-1 focus:ring-amber-400/40',
    heroGradient:'from-amber-500/10 via-amber-400/4 to-transparent',
  },
  green: {
    glow:        'shadow-[0_0_0_1px_rgba(16,185,129,0.28),0_0_32px_rgba(16,185,129,0.10)]',
    heroBorder:  'border-emerald-500/25',
    badge:       'bg-emerald-500/15 text-emerald-200 border border-emerald-400/20',
    accent:      'text-emerald-300',
    dot:         'bg-emerald-300',
    stepBorder:  'border-emerald-300/30 bg-emerald-400/10 text-emerald-200',
    barFill:     'bg-gradient-to-r from-emerald-400 to-green-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]',
    statusPill:  'bg-emerald-500/15 text-emerald-200 border border-emerald-400/20',
    ring:        'focus:ring-1 focus:ring-emerald-400/40',
    heroGradient:'from-emerald-500/10 via-emerald-400/4 to-transparent',
  },
};

export function getTheme(colorName) {
  return THEMES[colorName] || THEMES.blue;
}

// Derive a momentum score from the parsed response sections
export function deriveMomentum(parsed) {
  if (!parsed) return { score: 0, label: 'Pending', progress: '—', clarity: '—', followThrough: '—' };
  const sections = [parsed.summary, parsed.truth_breakdown, parsed.action_steps, parsed.accountability, parsed.support_mode];
  const filled = sections.filter(Boolean).length;
  const totalWords = sections.filter(Boolean).join(' ').split(/\s+/).length;
  let score = Math.min(95, Math.round((filled / 3) * 60 + Math.min(totalWords / 8, 35)));
  let label = score >= 75 ? 'Strong' : score >= 55 ? 'Improving' : score >= 35 ? 'Building' : 'Starting';
  let progress = score >= 70 ? 'On Track' : score >= 50 ? 'In Progress' : 'Early';
  let clarity  = parsed.truth_breakdown ? (totalWords > 80 ? 'High' : 'Medium') : 'Low';
  let followThrough = parsed.action_steps ? (parsed.action_steps.length > 60 ? 'Defined' : 'Emerging') : 'Pending';
  return { score, label, progress, clarity, followThrough };
}
