// ─── RESULTS DASHBOARD ────────────────────────────────────────────────────────
// Shows parsed agent response in structured dashboard sections.
// Rendered after each agent reply below the chat.
// ─────────────────────────────────────────────────────────────────────────────

function Section({ title, content, color, icon }) {
  if (!content) return null;
  return (
    <div
      className="rounded-xl p-4 mb-3"
      style={{
        backgroundColor: `${color}08`,
        border: `1px solid ${color}20`,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{icon}</span>
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: `${color}90` }}>
          {title}
        </p>
      </div>
      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

export default function ResultsDashboard({ parsed, agent }) {
  if (!parsed) return null;

  const { color, dashboardSections } = agent;

  const sectionMap = {
    summary: {
      title: 'Overview',
      icon: '◈',
      key: 'summary',
    },
    truth_breakdown: {
      title: 'What\'s Actually Happening',
      icon: '◎',
      key: 'truth_breakdown',
    },
    action_steps: {
      title: 'Next Move',
      icon: '▶',
      key: 'action_steps',
    },
    accountability: {
      title: 'Accountability Check',
      icon: '⬡',
      key: 'accountability',
    },
    support_mode: {
      title: 'Support',
      icon: '◇',
      key: 'support_mode',
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-2 mb-6">
      <div
        className="rounded-2xl p-4"
        style={{
          backgroundColor: '#1C1C1E',
          border: `1px solid ${color}20`,
        }}
      >
        <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: `${color}60` }}>
          Session Breakdown
        </p>

        {dashboardSections.map(sKey => {
          const def = sectionMap[sKey];
          if (!def) return null;
          return (
            <Section
              key={sKey}
              title={def.title}
              content={parsed[def.key]}
              color={color}
              icon={def.icon}
            />
          );
        })}
      </div>
    </div>
  );
}
