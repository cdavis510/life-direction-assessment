// ─── AGENT CHAT HISTORY ───────────────────────────────────────────────────────
// Scrollable message log shown below the avatar during a session.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';

function Message({ msg, agent }) {
  const isUser = msg.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={
          isUser
            ? {
                backgroundColor: `${agent.color}20`,
                border: `1px solid ${agent.color}40`,
                color: 'rgba(255,255,255,0.85)',
                borderBottomRightRadius: 4,
              }
            : {
                backgroundColor: '#2C2C2E',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.75)',
                borderBottomLeftRadius: 4,
              }
        }
      >
        {!isUser && (
          <p className="text-xs font-mono mb-1" style={{ color: `${agent.color}80` }}>
            {agent.name.toUpperCase()}
          </p>
        )}
        <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
      </div>
    </div>
  );
}

export default function AgentChatHistory({ messages, agent }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages.length) return null;

  return (
    <div className="w-full max-w-xl mx-auto px-4 mb-4 max-h-64 overflow-y-auto">
      {messages.map((msg, i) => (
        <Message key={i} msg={msg} agent={agent} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
