/**
 * MelvinAICoachCard.jsx
 * Melvin's AI Coach Card — Jordan
 *
 * Wraps AICoachCard with Melvin-specific persona config.
 * Extras: dual-path score display, Morehouse readiness strip,
 * hard truth card, priority focus, drift alert.
 *
 * Props:
 *   narrative           {string}
 *   avatarSrc           {string}
 *   isLoading           {boolean}
 *   isStreaming          {boolean}
 *   onChat              {func}
 *   onRegenerate        {func}
 *   pathScores          {Object}  — { financeScore, sportsScore, hybridScore }
 *   priorityFocus       {Object}  — { area, nextBestMove, urgency, isRepeatedPattern }
 *   hardTruth           {string}
 *   progressTrend       {string}  — 'improving' | 'flat' | 'declining' | 'baseline'
 *   driftAlert          {Object}  — { detected: boolean, topSignal: string } (optional)
 *   morehouseReadiness  {string}  — 'ready' | 'needs_prep' | 'at_risk'
 */

import AICoachCard from './AICoachCard.jsx';
import { AI_PERSONAS } from '../data/aiPersonas.js';

const MELVIN_PERSONA = AI_PERSONAS.melvin;

export default function MelvinAICoachCard({
  narrative,
  avatarSrc,
  isLoading,
  isStreaming,
  onChat,
  onRegenerate,
  pathScores,
  priorityFocus,
  hardTruth,
  progressTrend,
  driftAlert,
  morehouseReadiness,
}) {
  const accent = MELVIN_PERSONA.accentColor; // Emerald

  return (
    <div className="space-y-3">
      {/* Drift Alert */}
      {driftAlert?.detected && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-amber-800">
          <span className="text-amber-400 text-lg mt-0.5">⚡</span>
          <div>
            <p className="text-amber-300 text-sm font-semibold">Drift Detected</p>
            <p className="text-neutral-400 text-sm mt-0.5">
              {driftAlert.topSignal ?? 'Your goals and your daily behavior are pointed in different directions.'}
            </p>
          </div>
        </div>
      )}

      {/* Main AI Coach Card */}
      <AICoachCard
        persona={MELVIN_PERSONA}
        avatarSrc={avatarSrc}
        narrative={narrative}
        isLoading={isLoading}
        isStreaming={isStreaming}
        onChat={onChat}
        onRegenerate={onRegenerate}
      />

      {/* Dual Path Scores */}
      {pathScores && (
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
            Career Path Fit
          </p>
          <div className="grid grid-cols-3 gap-3">
            <PathScoreBar label="Finance" score={pathScores.financeScore} color="#10B981" />
            <PathScoreBar label="Sports Biz" score={pathScores.sportsScore} color="#3B82F6" />
            <PathScoreBar label="Hybrid" score={pathScores.hybridScore} color="#8B5CF6" />
          </div>
        </div>
      )}

      {/* Morehouse Readiness */}
      {morehouseReadiness && (
        <MorehouseReadinessStrip readiness={morehouseReadiness} accent={accent} />
      )}

      {/* Hard Truth */}
      {hardTruth && (
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
            The Hard Truth
          </p>
          <p className="text-neutral-200 text-sm leading-relaxed">{hardTruth}</p>
        </div>
      )}

      {/* Priority Focus */}
      {priorityFocus && (
        <div
          className="p-4 rounded-xl border"
          style={{ borderColor: `${accent}40`, backgroundColor: `${accent}08` }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
              Execute This First
            </p>
            {priorityFocus.isRepeatedPattern && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-900 text-amber-300">
                Pattern
              </span>
            )}
          </div>
          <p className="text-white font-semibold text-sm mb-1">{priorityFocus.area}</p>
          <p className="text-neutral-400 text-sm leading-snug">{priorityFocus.nextBestMove}</p>
        </div>
      )}

      {/* Progress Trend */}
      {progressTrend && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800">
          <TrendIndicator trend={progressTrend} accent={accent} />
          <span className="text-neutral-400 text-sm">
            {progressTrend === 'improving' && 'Improving — keep the momentum'}
            {progressTrend === 'flat' && 'Flat — time to increase execution'}
            {progressTrend === 'declining' && 'Declining — find the breakdown'}
            {progressTrend === 'baseline' && 'Baseline set — come back next month'}
          </span>
        </div>
      )}
    </div>
  );
}


function PathScoreBar({ label, score, color }) {
  const pct = Math.min(100, Math.max(0, score ?? 0));
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs text-neutral-500">{label}</span>
        <span className="text-xs font-semibold text-white">{score ?? '--'}</span>
      </div>
      <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function MorehouseReadinessStrip({ readiness, accent }) {
  const config = {
    ready: { label: 'Morehouse Ready', subtext: 'Prepared for the transition. Execute on Day 1.', color: '#10B981', bg: 'bg-emerald-950 border-emerald-800' },
    needs_prep: { label: 'Morehouse: Prep Needed', subtext: 'Key areas need attention before August.', color: '#F59E0B', bg: 'bg-amber-950 border-amber-800' },
    at_risk: { label: 'Morehouse: High Risk', subtext: 'Current patterns will create problems in the first semester.', color: '#EF4444', bg: 'bg-red-950 border-red-800' },
  };
  const cfg = config[readiness] ?? config.needs_prep;

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${cfg.bg}`}>
      <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.color }} />
      <div>
        <p className="text-sm font-semibold" style={{ color: cfg.color }}>{cfg.label}</p>
        <p className="text-xs text-neutral-400 mt-0.5">{cfg.subtext}</p>
      </div>
    </div>
  );
}

function TrendIndicator({ trend, accent }) {
  const map = {
    improving: { symbol: '↑', color: '#10B981' },
    flat: { symbol: '→', color: '#6B7280' },
    declining: { symbol: '↓', color: '#EF4444' },
    baseline: { symbol: '●', color: accent },
  };
  const { symbol, color } = map[trend] ?? map.baseline;
  return <span className="text-base font-bold" style={{ color }}>{symbol}</span>;
}
