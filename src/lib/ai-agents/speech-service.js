// ─── SPEECH SERVICE ───────────────────────────────────────────────────────────
// Browser Web Speech API with per-agent voice tuning.
// Falls back gracefully if speech synthesis unavailable.
// ─────────────────────────────────────────────────────────────────────────────

let currentUtterance = null;

export function isSpeechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  if (!isSpeechAvailable()) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

// Pick the best available voice for each agent
function selectVoice(agentId) {
  if (!isSpeechAvailable()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Preferred voice name patterns per agent
  const preferences = {
    quinn: ['Samantha', 'Karen', 'Moira', 'Victoria', 'Fiona', 'Google UK English Female'],
    kane:  ['Alex', 'Daniel', 'Google US English', 'Fred', 'Gordon'],
    caleb: ['Tom', 'Google UK English Male', 'Jamie', 'Reed', 'Nathan'],
  };

  const prefs = preferences[agentId] || [];
  for (const pref of prefs) {
    const match = voices.find(v => v.name.includes(pref));
    if (match) return match;
  }
  // fallback — first English voice
  return voices.find(v => v.lang.startsWith('en')) || voices[0];
}

/**
 * Speak text with agent-specific voice settings.
 * @param {string} text
 * @param {Object} agentConfig - agent from agent-config.js
 * @param {Object} callbacks - { onStart, onEnd, onBoundary, onError }
 * @returns {() => void} cancel function
 */
export function speakText(text, agentConfig, callbacks = {}) {
  if (!isSpeechAvailable() || !text?.trim()) {
    callbacks.onEnd?.();
    return () => {};
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  currentUtterance = utterance;

  // Apply voice settings from agent config
  const voiceSettings = agentConfig?.voice || {};
  utterance.rate   = voiceSettings.rate   ?? 0.92;
  utterance.pitch  = voiceSettings.pitch  ?? 1.0;
  utterance.volume = voiceSettings.volume ?? 1.0;

  // Set voice (may need to wait for voices to load)
  const setVoice = () => {
    const voice = selectVoice(agentConfig?.id);
    if (voice) utterance.voice = voice;
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }

  utterance.onstart    = () => callbacks.onStart?.();
  utterance.onend      = () => { currentUtterance = null; callbacks.onEnd?.(); };
  utterance.onerror    = (e) => { currentUtterance = null; callbacks.onError?.(e); callbacks.onEnd?.(); };
  utterance.onboundary = (e) => callbacks.onBoundary?.(e);

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  };
}

export function isSpeaking() {
  return isSpeechAvailable() && window.speechSynthesis.speaking;
}
