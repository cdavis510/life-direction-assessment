/**
 * AICoachCard.jsx
 * Base AI Coach Card component — shared by Mekhi, Melvin, and Mom cards.
 *
 * Props:
 *   persona       {Object}  — from AI_PERSONAS[user]: { displayName, role, shortDescriptor, tagline, avatarAlt, accentColor }
 *   avatarSrc     {string}  — image URL or path to AI avatar
 *   narrative     {string}  — AI-generated results narrative text (markdown or plain)
 *   isLoading     {boolean} — shows skeleton while narrative is generating
 *   isStreaming   {boolean} — shows streaming indicator
 *   onChat        {func}    — opens live chat with this AI coach
 *   onRegenerate  {func}    — triggers narrative regeneration
 *   accentColor   {string}  — override accent color via prop (default from persona)
 *   className     {string}  — additional class names
 */

import { useState } from 'react';

export default function AICoachCard({
  persona,
  avatarSrc,
  narrative,
  isLoading = false,
  isStreaming = false,
  onChat,
  onRegenerate,
  accentColor,
  className = '',
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accent = accentColor ?? persona?.accentColor ?? '#F59E0B';
  const displayName = persona?.displayName ?? 'AI Coach';
  const role = persona?.role ?? 'Personal Coach';
  const descriptor = persona?.shortDescriptor ?? '';
  const tagline = persona?.tagline ?? '';
  const avatarAlt = persona?.avatarAlt ?? 'AI coach avatar';

  return (
    <div
      className={`relative flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      {/* Accent glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Header — Avatar + Identity */}
      <div className="flex items-start gap-4 p-5 pb-4">
        {/* Avatar */}
        <div
          className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2"
          style={{ borderColor: `${accent}40` }}
        >
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={avatarAlt}
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarPlaceholder accent={accent} initial={displayName[0]} />
          )}
          {/* Live indicator */}
          <div
            className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-neutral-900"
            style={{ backgroundColor: accent }}
          />
        </div>

        {/* Name + Role */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-widest mb-0.5" style={{ color: accent }}>
            AI Coach
          </p>
          <h3 className="text-white font-bold text-lg leading-tight">{displayName}</h3>
          <p className="text-neutral-400 text-sm leading-snug mt-0.5">{role}</p>
        </div>
      </div>

      {/* Descriptor + Tagline */}
      <div className="px-5 pb-4 border-b border-neutral-800">
        <p className="text-neutral-300 text-sm leading-relaxed">{descriptor}</p>
        {tagline && (
          <p className="text-xs mt-2 font-medium italic" style={{ color: `${accent}CC` }}>
            "{tagline}"
          </p>
        )}
      </div>

      {/* Narrative Area */}
      <div className="flex-1 px-5 py-4">
        {isLoading ? (
          <NarrativeSkeleton />
        ) : isStreaming ? (
          <StreamingState accent={accent} />
        ) : narrative ? (
          <NarrativeContent
            narrative={narrative}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((p) => !p)}
            accent={accent}
          />
        ) : (
          <EmptyNarrative accent={accent} />
        )}
      </div>

      {/* CTA Row */}
      <div className="flex gap-3 px-5 pb-5 pt-2">
        <button
          onClick={onChat}
          disabled={isLoading || isStreaming}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: accent,
            color: '#0a0a0a',
          }}
        >
          Talk to {displayName}
        </button>

        {onRegenerate && (
          <button
            onClick={onRegenerate}
            disabled={isLoading || isStreaming}
            className="px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 border border-neutral-700 hover:border-neutral-500 hover:text-neutral-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
}


// ── Sub-components ─────────────────────────────────────────

function AvatarPlaceholder({ accent, initial }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center text-2xl font-bold"
      style={{ backgroundColor: `${accent}20`, color: accent }}
    >
      {initial}
    </div>
  );
}

function NarrativeSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {[100, 90, 75, 95, 80, 60].map((w, i) => (
        <div
          key={i}
          className="h-3.5 rounded-full bg-neutral-800"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}

function StreamingState({ accent }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex gap-1.5">
        {[0, 0.15, 0.3].map((delay, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: accent, animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <span className="text-sm text-neutral-400">Generating your report…</span>
    </div>
  );
}

function NarrativeContent({ narrative, isExpanded, onToggle, accent }) {
  const PREVIEW_LENGTH = 300;
  const isLong = narrative.length > PREVIEW_LENGTH;
  const displayText = isLong && !isExpanded
    ? narrative.slice(0, PREVIEW_LENGTH) + '…'
    : narrative;

  return (
    <div>
      <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
        {displayText}
      </p>
      {isLong && (
        <button
          onClick={onToggle}
          className="mt-3 text-xs font-medium transition-colors"
          style={{ color: accent }}
        >
          {isExpanded ? '↑ Show less' : '↓ Read full report'}
        </button>
      )}
    </div>
  );
}

function EmptyNarrative({ accent }) {
  return (
    <div className="py-4 text-center">
      <p className="text-neutral-500 text-sm">
        Complete your assessment to unlock your personalized AI report.
      </p>
      <div
        className="mt-3 mx-auto w-8 h-[1px] opacity-40"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}
