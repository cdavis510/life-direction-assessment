// ─── AGENT SELECT SCREEN ──────────────────────────────────────────────────────
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AGENT_LIST } from '../../lib/ai-agents/agent-config.js';

const PORTRAIT_PATHS = {
  quinn: '/avatars/quinn/portrait.jpg',
  kane:  '/avatars/kane/portrait.jpg',
  caleb: '/avatars/caleb/portrait.jpg',
};

function AgentCard({ agent, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const { color, name } = agent;
  const portrait = PORTRAIT_PATHS[agent.id];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden text-left transition-all duration-400 focus:outline-none"
      style={{
        backgroundColor: '#141418',
        border: `1px solid ${hovered ? color + '70' : color + '25'}`,
        boxShadow: hovered
          ? `0 0 40px ${color}30, 0 0 80px ${color}12, inset 0 0 20px ${color}06`
          : '0 2px 12px rgba(0,0,0,0.4)',
        transform: hovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Portrait image — takes up top 70% of card */}
      <div className="relative w-full" style={{ aspectRatio: '3/4', maxHeight: 280 }}>
        {!imgError && portrait ? (
          <img
            src={portrait}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(160deg, ${color}20, #0a0a0a)` }}
          >
            <span
              className="text-7xl font-bold"
              style={{ fontFamily: 'Bebas Neue, sans-serif', color }}
            >
              {name[0]}
            </span>
          </div>
        )}

        {/* Gradient overlay on image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, #141418 100%)`,
          }}
        />

        {/* Glow border on image hover */}
        <div
          className="absolute inset-0 rounded-t-2xl transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 30px ${color}20`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Info section */}
      <div className="px-5 pb-5 -mt-2 relative z-10">
        <p
          className="text-2xl font-bold mb-0.5"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            color: color,
            letterSpacing: '0.06em',
          }}
        >
          {name}
        </p>
        <p className="text-white/50 text-xs mb-1">{agent.title}</p>
        <p className="text-white/20 text-xs font-mono">{agent.role}</p>

        {/* Tap indicator */}
        <div
          className="mt-4 flex items-center gap-2 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: color }}
          />
          <span className="text-white/40 text-xs">Start session</span>
        </div>
      </div>

      {/* Bottom color bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          backgroundColor: color,
          opacity: hovered ? 0.7 : 0.2,
        }}
      />
    </button>
  );
}

export default function AgentSelect() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: '#0E0E11' }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-white/25 text-xs uppercase tracking-widest font-mono mb-3">
          Life Growth System
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold mb-3"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: '0.06em',
            color: '#FFFFFF',
          }}
        >
          AI Agents
        </h1>
        <p className="text-white/35 text-sm">Choose your personal life coach</p>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {AGENT_LIST.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onClick={() => navigate(`/agents/${agent.id}`)}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-12 text-white/20 text-xs hover:text-white/50 transition-colors font-mono"
      >
        ← Back to home
      </button>
    </div>
  );
}
