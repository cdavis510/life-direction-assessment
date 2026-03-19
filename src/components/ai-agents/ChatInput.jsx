// ─── CHAT INPUT ───────────────────────────────────────────────────────────────
// Text input bar with send button and optional voice mic.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef } from 'react';

export default function ChatInput({ agent, onSend, disabled }) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSend = () => {
    const msg = text.trim();
    if (!msg || disabled) return;
    setText('');
    onSend(msg);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript || '';
      setText(prev => (prev ? prev + ' ' + transcript : transcript));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.start();
    setListening(true);
  };

  const hasMic = typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-6">
      <div
        className="flex items-end gap-2 rounded-2xl p-2"
        style={{
          backgroundColor: '#2C2C2E',
          border: `1px solid ${agent.color}30`,
          boxShadow: `0 0 20px ${agent.color}10`,
        }}
      >
        {/* Textarea */}
        <textarea
          rows={1}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          disabled={disabled}
          className="flex-1 bg-transparent resize-none outline-none text-sm text-white/80 placeholder-white/25 px-2 py-1.5 max-h-32 leading-relaxed"
          style={{ fontFamily: 'inherit' }}
        />

        {/* Mic button */}
        {hasMic && (
          <button
            onClick={toggleMic}
            disabled={disabled}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              backgroundColor: listening ? `${agent.color}30` : 'transparent',
              border: `1px solid ${listening ? agent.color : 'transparent'}`,
              color: listening ? agent.color : 'rgba(255,255,255,0.3)',
            }}
            title="Voice input"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
        )}

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
          style={{
            backgroundColor: text.trim() && !disabled ? agent.color : `${agent.color}30`,
            color: text.trim() && !disabled ? '#fff' : `${agent.color}60`,
          }}
          title="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      <p className="text-center text-white/15 text-xs mt-2 font-mono">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
