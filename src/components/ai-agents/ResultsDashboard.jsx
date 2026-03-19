// ─── RESULTS DASHBOARD ────────────────────────────────────────────────────────
// Premium dark results view rendered after each agent reply.
// Props kept identical to existing usage: { parsed, agent }
// Avatar colors / avatar logic / AvatarScreen are NOT changed.
// ─────────────────────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { getTheme, deriveMomentum } from './results/agentTheme.js';
import MomentumBand   from './results/MomentumBand.jsx';
import SectionCard    from './results/SectionCard.jsx';
import SideRail       from './results/SideRail.jsx';
import NotesCard      from './results/NotesCard.jsx';

export default function ResultsDashboard({ parsed, agent }) {
  const navigate = useNavigate();
  if (!parsed || !agent) return null;

  const theme    = getTheme(agent.colorName);
  const glow     = theme.glow;
  const momentum = deriveMomentum(parsed);

  return (
    <div className="relative w-full overflow-hidden bg-[#0B0F1A] text-white font-sans">

      {/* Page ambient gradient — agent color bleeds from top-left */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.heroGradient}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.055),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-14 pt-5 md:px-6 md:pt-7 xl:px-8">

        {/* ── BACK BUTTON ── */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm text-white/38 hover:text-white/70 transition-colors duration-180"
        >
          <span className="text-base leading-none">←</span>
          <span>Back</span>
        </button>

        {/* ── HERO HEADER ── */}
        <header className={[
          'rounded-[28px] border border-white/8 bg-white/[0.045] backdrop-blur-xl',
          'px-5 py-5 md:px-7 md:py-6 mb-5',
          glow,
        ].join(' ')}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            {/* Left — identity */}
            <div className="space-y-2">
              <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}>
                {agent.name} — Session Insight
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-white md:text-[36px] md:leading-[42px]">
                Results Dashboard
              </h1>
              <p className="max-w-xl text-sm leading-6 text-white/58 md:text-base">
                {agent.title}
              </p>
            </div>

            {/* Right — meta chips */}
            <div className="grid grid-cols-3 gap-3 sm:min-w-[340px]">
              {[
                { label: 'Agent',  value: agent.name,       accent: true },
                { label: 'Mode',   value: 'Insight Review', accent: false },
                { label: 'Status', value: 'Updated',        accent: false },
              ].map(({ label, value, accent }) => (
                <div key={label} className="rounded-[18px] border border-white/8 bg-black/20 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</p>
                  <p className={`mt-1 text-sm font-semibold ${accent ? theme.accent : 'text-white/85'}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── MOMENTUM BAND ── */}
        <div className="mb-5">
          <MomentumBand momentum={momentum} theme={theme} glow={glow} />
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid gap-5 lg:grid-cols-12">

          {/* LEFT — main content 8 cols */}
          <div className="space-y-5 lg:col-span-8">

            {/* Summary */}
            {parsed.summary && (
              <SectionCard title="Summary" glow={glow}>
                <p className="text-base font-medium leading-[1.85] text-white/94 md:text-lg">
                  {parsed.summary}
                </p>
              </SectionCard>
            )}

            {/* What's Actually Happening */}
            {parsed.truth_breakdown && (
              <SectionCard title="What's Actually Happening" glow={glow}>
                <p className="whitespace-pre-wrap">{parsed.truth_breakdown}</p>
              </SectionCard>
            )}

            {/* Coach Guidance (accountability or support_mode) */}
            {(parsed.accountability || parsed.support_mode) && (
              <SectionCard title="Coach Guidance" glow={glow}>
                <p className="whitespace-pre-wrap">
                  {parsed.accountability || parsed.support_mode}
                </p>
              </SectionCard>
            )}

            {/* Notes */}
            <NotesCard glow={glow} theme={theme} />
          </div>

          {/* RIGHT RAIL — 4 cols */}
          <div className="lg:col-span-4">
            <SideRail parsed={parsed} agent={agent} theme={theme} glow={glow} />
          </div>
        </div>

        {/* Footer timestamp */}
        <p className="mt-8 text-center text-[11px] text-white/20 tracking-wide">
          Last updated just now
        </p>
      </div>
    </div>
  );
}
