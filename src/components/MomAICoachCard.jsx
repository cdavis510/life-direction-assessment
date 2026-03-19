/**
 * MomAICoachCard.jsx
 * Mom's AI Coach Card — Renee
 *
 * Wraps AICoachCard with Mom-specific persona config.
 * Extras: blind spot alert strip, son need cards (Mekhi + Melvin),
 * hard truth card, priority focus, pattern alert, progress trend.
 *
 * Props:
 *   narrative        {string}
 *   avatarSrc        {string}
 *   isLoading        {boolean}
 *   isStreaming       {boolean}
 *   onChat           {func}
 *   onRegenerate     {func}
 *   priorityFocus    {Object}   — { area, nextBestMove, urgency, isRepeatedPattern }
 *   hardTruth        {string}
 *   progressTrend    {string}   — 'improving' | 'flat' | 'declining' | 'baseline'
 *   patternAlert     {Object}   — { alerts: [{ area, message, urgency }] } | null
 *   blindSpotCount   {number}   — number of blind spots detected
 *   topBlindSpot     {Object}   — { label, correction } (most important one)
 *   mekhiTopNeed     {string}   — single top need for Mekhi
 *   melvinTopNeed    {string}   — single top need for Melvin
 *   riskLevel        {string}   — 'low' | 'medium' | 'elevated' | 'high' | 'critical'
 */

import AICoachCard from './AICoachCard.jsx';
import { AI_PERSONAS } from '../data/aiPersonas.js';

const MOM_PERSONA = AI_PERSONAS.mom;

export default function MomAICoachCard({
  narrative,
  avatarSrc,
  isLoading,
  isStreaming,
  onChat,
  onRegenerate,
  priorityFocus,
  hardTruth,
  progressTrend,
  patternAlert,
  blindSpotCount,
  topBlindSpot,
  mekhiTopNeed,
  melvinTopNeed,
  riskLevel,
}) {
  const accent = MOM_PERSONA.accentColor; // Violet

  return (
    <div className="space-y-3">
      {/* High Risk Alert */}
      {(riskLevel === 'high' || riskLevel === 'critical') && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950 border border-red-800">
          <span className="text-red-400 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-red-300 text-sm font-semibold">High Risk Detected</p>
            <p className="text-red-400 text-sm mt-0.5">
              One or more areas require immediate attention this session — not next month.
            </p>
          </div>
        </div>
      )}

      {/* Pattern Alert */}
      {patternAlert && patternAlert.alerts?.length > 0 && (
        <div className="p-4 rounded-xl bg-neutral-900 border border-amber-800">
          <p className="text-amber-300 text-sm font-semibold mb-2">Repeated Pattern Alert</p>
          {patternAlert.alerts.slice(0, 2).map((alert, i) => (
            <p key={i} className="text-neutral-400 text-sm leading-snug mb-1">
              • {alert.message}
            </p>
          ))}
          <p className="text-amber-400 text-xs mt-2 font-medium">
            This is a pattern, not a bad stretch. It requires a different approach.
          </p>
        </div>
      )}

      {/* Main AI Coach Card */}
      <AICoachCard
        persona={MOM_PERSONA}
        avatarSrc={avatarSrc}
        narrative={narrative}
        isLoading={isLoading}
        isStreaming={isStreaming}
        onChat={onChat}
        onRegenerate={onRegenerate}
      />

      {/* Top Blind Spot Strip */}
      {topBlindSpot && (
        <div
          className="p-4 rounded-xl border"
          style={{ borderColor: `${accent}30`, backgroundColor: `${accent}08` }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
              Blind Spot
            </p>
            {blindSpotCount > 1 && (
              <span className="text-xs text-neutral-500">+{blindSpotCount - 1} more</span>
            )}
          </div>
          <p className="text-white text-sm font-semibold mb-1">{topBlindSpot.label}</p>
          <p className="text-neutral-400 text-sm leading-snug">{topBlindSpot.correction}</p>
        </div>
      )}

      {/* Son Needs — Mekhi + Melvin side by side */}
      {(mekhiTopNeed || melvinTopNeed) && (
        <div className="grid grid-cols-2 gap-3">
          {mekhiTopNeed && (
            <SonNeedMini
              name="Mekhi"
              need={mekhiTopNeed}
              color="#F59E0B"
            />
          )}
          {melvinTopNeed && (
            <SonNeedMini
              name="Melvin"
              need={melvinTopNeed}
              color="#10B981"
            />
          )}
        </div>
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
              Your #1 Focus This Month
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
            {progressTrend === 'improving' && 'Things are improving — what changed? Keep doing it.'}
            {progressTrend === 'flat' && 'Holding steady — consistency is good. Push forward.'}
            {progressTrend === 'declining' && 'Scores down — find the pattern before next month.'}
            {progressTrend === 'baseline' && 'Your baseline is set. Check in again next month.'}
          </span>
        </div>
      )}
    </div>
  );
}


function SonNeedMini({ name, need, color }) {
  return (
    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
      <p className="text-xs font-semibold mb-1.5" style={{ color }}>
        {name} needs
      </p>
      <p className="text-neutral-300 text-xs leading-snug">{need}</p>
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
