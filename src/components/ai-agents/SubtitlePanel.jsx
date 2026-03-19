// ─── SUBTITLE PANEL ───────────────────────────────────────────────────────────
// Shows the agent's current spoken text as a subtitle strip.
// Fades in when speaking, fades out when idle.
// ─────────────────────────────────────────────────────────────────────────────

export default function SubtitlePanel({ text, agent, visible }) {
  if (!text) return null;

  return (
    <div
      className="w-full max-w-xl mx-auto px-4 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="rounded-xl px-5 py-3 text-center text-sm leading-relaxed"
        style={{
          backgroundColor: `${agent.color}12`,
          border: `1px solid ${agent.color}30`,
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        {text}
      </div>
    </div>
  );
}
