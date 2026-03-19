// ─── AVATAR STAGE ─────────────────────────────────────────────────────────────
// Portrait-based animated avatar stage.
// Loads portrait.png from /public/avatars/{agentId}/portrait.png
// States: idle (float+breathe) | thinking (tilt+pulse) | speaking (bob+glow)
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';

const PORTRAIT_PATHS = {
  quinn: '/avatars/quinn/portrait.jpg',
  kane:  '/avatars/kane/portrait.jpg',
  caleb: '/avatars/caleb/portrait.jpg',
};

// Per-state CSS animation names
const STATE_ANIMATIONS = {
  idle:     'avatarFloat 5s ease-in-out infinite',
  thinking: 'avatarThink 2s ease-in-out infinite',
  speaking: 'avatarSpeak 0.55s ease-in-out infinite',
};

// Per-state glow intensity
const STATE_GLOW = {
  idle:     (c) => `0 0 40px ${c}30, 0 0 80px ${c}12`,
  thinking: (c) => `0 0 50px ${c}50, 0 0 100px ${c}20`,
  speaking: (c) => `0 0 60px ${c}70, 0 0 120px ${c}30`,
};

function PortraitAvatar({ agent, avatarState }) {
  const [imgError, setImgError] = useState(false);
  const { color, name } = agent;
  const portraitSrc = PORTRAIT_PATHS[agent.id];
  const animation   = STATE_ANIMATIONS[avatarState] || STATE_ANIMATIONS.idle;
  const glow        = STATE_GLOW[avatarState]?.(color) || STATE_GLOW.idle(color);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 260, height: 340 }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${color}18 0%, transparent 70%)`,
          animation: 'glowPulse 3s ease-in-out infinite',
        }}
      />

      {/* Portrait card */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: 220,
          height: 310,
          animation,
          boxShadow: glow,
          border: `1px solid ${color}40`,
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {!imgError && portraitSrc ? (
          <img
            src={portraitSrc}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        ) : (
          /* Premium fallback if portrait file missing */
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${color}18 0%, #0a0a0a 100%)`,
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
              style={{
                background: `radial-gradient(circle, ${color}40, ${color}10)`,
                border: `2px solid ${color}60`,
              }}
            >
              <span
                className="text-5xl font-bold"
                style={{ fontFamily: 'Bebas Neue, sans-serif', color }}
              >
                {name[0]}
              </span>
            </div>
            <p className="text-white/20 text-xs font-mono">{name}</p>
          </div>
        )}

        {/* Speaking overlay — animated scanline shimmer */}
        {avatarState === 'speaking' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(0deg, transparent 40%, ${color}08 50%, transparent 60%)`,
              animation: 'scanline 1s linear infinite',
            }}
          />
        )}

        {/* Thinking overlay — slow vignette pulse */}
        {avatarState === 'thinking' && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              boxShadow: `inset 0 0 40px ${color}30`,
              animation: 'thinkVignette 1.5s ease-in-out infinite alternate',
            }}
          />
        )}

        {/* Bottom gradient for subtitle legibility */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          }}
        />
      </div>

      {/* Speaking sound bars below portrait */}
      {avatarState === 'speaking' && (
        <div className="absolute -bottom-6 flex items-end gap-1 justify-center" style={{ height: 20 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className="w-1 rounded-full"
              style={{
                backgroundColor: color,
                animation: `soundBar 0.6s ease-in-out ${i * 0.1}s infinite alternate`,
                height: 6,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}

      {/* Thinking dots below portrait */}
      {avatarState === 'thinking' && (
        <div className="absolute -bottom-7 flex items-center gap-1.5 justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: color,
                animation: `thinkDot 1s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AvatarStage({ agent, avatarState }) {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <style>{`
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-6px) rotate(0.4deg); }
          66%       { transform: translateY(-3px) rotate(-0.3deg); }
        }
        @keyframes avatarThink {
          0%, 100% { transform: translateY(-2px) rotate(-1deg) scale(1); }
          50%       { transform: translateY(2px)  rotate(1deg)  scale(1.01); }
        }
        @keyframes avatarSpeak {
          0%, 100% { transform: translateY(0px)   rotate(0deg)   scale(1); }
          25%       { transform: translateY(-3px)  rotate(-0.5deg) scale(1.01); }
          75%       { transform: translateY(2px)   rotate(0.5deg)  scale(0.99); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes thinkVignette {
          0%   { opacity: 0.4; }
          100% { opacity: 1; }
        }
        @keyframes soundBar {
          0%   { height: 4px; }
          100% { height: 20px; }
        }
        @keyframes thinkDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
      <PortraitAvatar agent={agent} avatarState={avatarState} />
    </div>
  );
}
