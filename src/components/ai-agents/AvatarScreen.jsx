// ─── AVATAR SCREEN ────────────────────────────────────────────────────────────
// Full AI agent interaction screen.
// Header → Avatar → Subtitle → Chat history → Chat input → Results dashboard
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAgent } from '../../lib/ai-agents/agent-config.js';
import { sendAgentMessage, parseResponseForDashboard } from '../../lib/ai-agents/chat-service.js';
import { stopSpeaking, isSpeechAvailable } from '../../lib/ai-agents/speech-service.js';
import { speakWithElevenLabs, stopAudio } from '../../lib/ai-agents/elevenlabs-service.js';
import AvatarStage from './AvatarStage.jsx';
import SubtitlePanel from './SubtitlePanel.jsx';
import ChatInput from './ChatInput.jsx';
import AgentChatHistory from './AgentChatHistory.jsx';
import ResultsDashboard from './ResultsDashboard.jsx';

// ─── idle line rotator ──────────────────────────────────────────────────────
function useIdleLine(agent, avatarState) {
  const [line, setLine] = useState(() => {
    const lines = agent?.idleLines || [];
    return lines[Math.floor(Math.random() * lines.length)] || '';
  });
  const timerRef = useRef(null);

  useEffect(() => {
    if (avatarState !== 'idle') return;
    timerRef.current = setInterval(() => {
      const lines = agent?.idleLines || [];
      setLine(lines[Math.floor(Math.random() * lines.length)] || '');
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [agent, avatarState]);

  return line;
}

// ─── thinking line rotator ──────────────────────────────────────────────────
function useThinkingLine(agent, avatarState) {
  const [line, setLine] = useState('');
  useEffect(() => {
    if (avatarState !== 'thinking') { setLine(''); return; }
    const lines = agent?.thinkingLines || ['Working through this…'];
    setLine(lines[Math.floor(Math.random() * lines.length)]);
    const t = setInterval(() => {
      setLine(lines[Math.floor(Math.random() * lines.length)]);
    }, 2500);
    return () => clearInterval(t);
  }, [agent, avatarState]);
  return line;
}

// ─── main component ──────────────────────────────────────────────────────────
export default function AvatarScreen() {
  const { agentId } = useParams();
  const navigate    = useNavigate();
  const agent       = getAgent(agentId);

  const [avatarState,  setAvatarState]  = useState('idle');   // idle | thinking | speaking
  const [history,      setHistory]      = useState([]);        // [{role, content}]
  const [subtitle,     setSubtitle]     = useState('');
  const [parsed,       setParsed]       = useState(null);
  const [speechOn,     setSpeechOn]     = useState(true);
  const [loading,      setLoading]      = useState(false);
  const cancelSpeechRef = useRef(null);

  const idleLine     = useIdleLine(agent, avatarState);
  const thinkingLine = useThinkingLine(agent, avatarState);

  // Display text for subtitle panel
  const subtitleText = avatarState === 'thinking' ? thinkingLine
                     : avatarState === 'speaking'  ? subtitle
                     : idleLine;

  const handleSend = useCallback(async (userMessage) => {
    if (!agent || loading) return;

    // Add user message to visible history
    const newHistory = [...history, { role: 'user', content: userMessage }];
    setHistory(newHistory);
    setLoading(true);
    setAvatarState('thinking');
    setParsed(null);

    try {
      const result = await sendAgentMessage(agentId, history, userMessage);
      const responseText = result.text;

      // Add agent reply to history
      setHistory(prev => [...prev, { role: 'assistant', content: responseText }]);

      // Parse for dashboard
      const dashData = parseResponseForDashboard(responseText, agentId);
      setParsed(dashData);

      if (speechOn) {
        setAvatarState('speaking');
        setSubtitle(responseText);
        cancelSpeechRef.current = await speakWithElevenLabs(responseText, agent, {
          onStart: () => setAvatarState('speaking'),
          onEnd: () => {
            setAvatarState('idle');
            setSubtitle('');
          },
          onError: () => {
            setAvatarState('idle');
            setSubtitle('');
          },
        });
      } else {
        setAvatarState('idle');
        setSubtitle(responseText);
        // Auto-clear subtitle after 8s when speech is off
        setTimeout(() => setSubtitle(''), 8000);
      }
    } catch (err) {
      console.error('Agent error:', err);
      setHistory(prev => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
      setAvatarState('idle');
    } finally {
      setLoading(false);
    }
  }, [agent, agentId, history, loading, speechOn]);

  const toggleSpeech = () => {
    if (speechOn) {
      stopAudio();
      stopSpeaking();
      setAvatarState('idle');
      setSubtitle('');
    }
    setSpeechOn(s => !s);
  };

  // Cleanup on unmount
  useEffect(() => () => { stopAudio(); stopSpeaking(); }, []);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">Agent not found.</p>
          <button onClick={() => navigate('/agents')} className="text-white/60 text-sm underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#1C1C1E' }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: `${agent.color}20` }}
      >
        <button
          onClick={() => { stopSpeaking(); navigate('/agents'); }}
          className="text-white/30 hover:text-white/70 transition-colors text-sm flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Agents
        </button>

        <div className="text-center">
          <p
            className="text-lg font-bold"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: agent.color, letterSpacing: '0.05em' }}
          >
            {agent.name}
          </p>
          <p className="text-white/30 text-xs">{agent.title}</p>
        </div>

        {/* Speech toggle */}
        {isSpeechAvailable() && (
          <button
            onClick={toggleSpeech}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              backgroundColor: speechOn ? `${agent.color}20` : 'transparent',
              border: `1px solid ${speechOn ? agent.color : 'rgba(255,255,255,0.1)'}`,
              color: speechOn ? agent.color : 'rgba(255,255,255,0.25)',
            }}
            title={speechOn ? 'Mute voice' : 'Enable voice'}
          >
            {speechOn ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            )}
          </button>
        )}
        {!isSpeechAvailable() && <div className="w-9" />}
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Avatar */}
        <AvatarStage agent={agent} avatarState={avatarState} />

        {/* Subtitle */}
        <SubtitlePanel
          text={subtitleText}
          agent={agent}
          visible={!!subtitleText}
        />

        {/* Chat history */}
        <div className="mt-4">
          <AgentChatHistory messages={history} agent={agent} />
        </div>

        {/* Results dashboard — shows after latest agent reply */}
        {parsed && <ResultsDashboard parsed={parsed} agent={agent} />}

        {/* Spacer so content isn't hidden behind fixed input */}
        <div className="h-4" />
      </div>

      {/* ── Sticky input ── */}
      <div
        className="border-t pt-3"
        style={{ borderColor: `${agent.color}15`, backgroundColor: '#1C1C1E' }}
      >
        <ChatInput
          agent={agent}
          onSend={handleSend}
          disabled={loading}
        />
      </div>
    </div>
  );
}
