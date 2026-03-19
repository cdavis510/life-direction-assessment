// ─── MomentumBand — progress status strip under hero header ──────────────────
import { useEffect, useRef, useState } from 'react';

export default function MomentumBand({ momentum, theme, glow }) {
  const { score, label, progress, clarity, followThrough } = momentum;
  const [filled, setFilled] = useState(0);

  // Animate bar on mount
  useEffect(() => {
    const t = setTimeout(() => setFilled(score), 120);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div
      className={[
        'rounded-[24px] border border-white/8 bg-[#111827]/80 backdrop-blur-md',
        'px-5 py-5 md:px-6 md:py-6',
        glow,
      ].join(' ')}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          Current Momentum
        </p>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.statusPill}`}>
          {label}
        </span>
      </div>

      {/* Score */}
      <div className={`text-3xl font-bold tracking-tight mb-3 ${theme.accent}`}>
        {score}<span className="text-lg text-white/40">%</span>
      </div>

      {/* Progress bar */}
      <div className="h-[10px] w-full overflow-hidden rounded-full bg-white/8 mb-4">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${theme.barFill}`}
          style={{ width: `${filled}%` }}
        />
      </div>

      {/* Micro metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Progress',       value: progress       },
          { label: 'Clarity',        value: clarity        },
          { label: 'Follow-Through', value: followThrough  },
        ].map(({ label: lbl, value }) => (
          <div key={lbl} className="rounded-[14px] border border-white/6 bg-black/20 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-1">{lbl}</p>
            <p className={`text-sm font-semibold ${theme.accent}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
