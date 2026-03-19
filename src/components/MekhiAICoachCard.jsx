/**
 * MekhiAICoachCard.jsx
 * Mekhi's AI Coach Card — Marcus
 *
 * Wraps AICoachCard with Mekhi-specific persona config,
 * accent color, and card extras: academic alert badge,
 * priority focus strip, and next best move.
 *
 * Props:
 *   narrative        {string}   — AI-generated narrative text
 *   avatarSrc        {string}   — path to Marcus AI avatar image
 *   isLoading        {boolean}
 *   isStreaming       {boolean}
 *   onChat           {func}
 *   onRegenerate     {func}
 *   academicAlert    {Object}   — { level: 'critical'|'high'|null, label: string } (optional)
 *   priorityFocus    {Object}   — { area, nextBestMove, urgency } from buildPriorityFocusCard
 *   hardTruth        {string}   — from buildHardTruthCard
 *   progressTrend    {string}   — 'improving' | 'flat' | 'declining'
 */

import AICoachCard from './AICoachCard.jsx';
import { AI_PERSONAS } from '../data/aiPersonas.js';

const MEKHI_PERSONA = AI_PERSONAS.mekhi;

export default function MekhiAICoachCard({
  narrative,
  avatarSrc,
  isLoading,
  isStreaming,
  onChat,
  onRegenerate,
  academicAlert,
  priorityFocus,
  hardTruth,
  progressTrend,
}) {
  const accent = MEKHI_PERSONA.accentColor; // Amber

  return (
    <div className="space-y-3">
      {/* Academic Alert — renders above card if critical */}
      {academicAlert?.level === 'critical' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950 border border-red-800">
          <span className="text-red-400 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-red-300 text-sm font-semibold">Academic Alert</p>
            <p className="text-red-400 text-sm mt-0.5">{academicAlert.label}</p>
          </div>
        </div>
      )}
      {academicAlert?.level === 'high' && !academicAlert?.level === 'critical' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950 border border-amber-800">
          <span className="text-amber-400 text-lg mt-0.5">!</span>
          <div>
            <p className="text-amber-300 text-sm font-semibold">Academic Risk</p>
            <p className="text-amber-400 text-sm mt-0.5">{academicAlert.label}</p>
          </div>
        </div>
      )}

      {/* Main AI Coach Card */}
      <AICoachCard
        persona={MEKHI_PERSONA}
        avatarSrc={avatarSrc}
        narrative={narrative}
        isLoading={isLoading}
        isStreaming={isStreaming}
        onChat={onChat}
        onRegenerate={onRegenerate}
      />

      {/* Hard Truth Card */}
      {hardTruth && (
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
            The Hard Truth
          </p>
          <p className="text-neutral-200 text-sm leading-relaxed">{hardTruth}</p>
        </div>
      )}

      {/* Priority Focus + Next Best Move */}
      {priorityFocus && (
        <div
          className="p-4 rounded-xl border"
          style={{ borderColor: `${accent}40`, backgroundColor: `${accent}08` }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
              #1 Focus Right Now
            </p>
            {priorityFocus.urgency === 'critical' && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-900 text-red-300">
                Critical
              </span>
            )}
            {priorityFocus.urgency === 'high' && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-900 text-amber-300">
                High
              </span>
            )}
          </div>
          <p className="text-white font-semibold text-sm mb-1">{priorityFocus.area}</p>
          <p className="text-neutral-400 text-sm leading-snug">{priorityFocus.nextBestMove}</p>
        </div>
      )}

      {/* Progress Trend Badge */}
      {progressTrend && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800">
          <TrendIndicator trend={progressTrend} accent={accent} />
          <span className="text-neutral-400 text-sm">
            {progressTrend === 'improving' && 'Progress: Improving since last session'}
            {progressTrend === 'flat' && 'Progress: Holding steady — choose a direction'}
            {progressTrend === 'declining' && 'Progress: Declining — identify the break point'}
            {progressTrend === 'baseline' && 'First session — baseline recorded'}
          </span>
        </div>
      )}
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
