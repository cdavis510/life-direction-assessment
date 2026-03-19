// ─── SideRail — Key Patterns + Next Best Steps ───────────────────────────────
import SectionCard from './SectionCard.jsx';

function parseList(text) {
  if (!text) return [];
  return text
    .split(/\n|•|-|\d+\./)
    .map(s => s.trim())
    .filter(s => s.length > 4);
}

export default function SideRail({ parsed, agent, theme, glow }) {
  const patterns = parseList(parsed?.action_steps);
  const steps    = parseList(parsed?.accountability || parsed?.support_mode);
  const hasPats  = patterns.length > 0;
  const hasSteps = steps.length > 0;

  return (
    <div className="space-y-5">
      {/* Key Patterns */}
      <SectionCard title="Key Patterns" glow={glow}>
        {hasPats ? (
          <ul className="space-y-3">
            {patterns.slice(0, 5).map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className={`mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full ${theme.dot}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/40 text-sm">Patterns will appear after your next session.</p>
        )}
      </SectionCard>

      {/* Next Best Steps */}
      <SectionCard title="Next Best Steps" glow={glow}>
        {hasSteps ? (
          <ol className="space-y-4">
            {steps.slice(0, 5).map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className={[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold mt-[1px]',
                  theme.stepBorder,
                ].join(' ')}>
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-white/40 text-sm">Steps will appear after your session.</p>
        )}
      </SectionCard>
    </div>
  );
}
