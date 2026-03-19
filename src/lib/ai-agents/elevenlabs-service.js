// ─── ELEVENLABS SERVICE ───────────────────────────────────────────────────────
// Calls the Netlify proxy to get ElevenLabs TTS audio.
// Falls back to browser SpeechSynthesis if ElevenLabs is unavailable.
// ─────────────────────────────────────────────────────────────────────────────

import { speakText, isSpeechAvailable } from './speech-service.js';

let currentAudio = null;

export function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}

/**
 * Speak text using ElevenLabs (via Netlify proxy), with browser TTS fallback.
 * @param {string} text
 * @param {Object} agentConfig  — agent from agent-config.js
 * @param {{ onStart, onEnd, onError }} callbacks
 * @returns {() => void} cancel function
 */
export async function speakWithElevenLabs(text, agentConfig, callbacks = {}) {
  if (!text?.trim()) {
    callbacks.onEnd?.();
    return () => {};
  }

  stopAudio();

  try {
    const resp = await fetch('/.netlify/functions/elevenlabs-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, agentId: agentConfig.id }),
    });

    if (!resp.ok) throw new Error(`TTS proxy ${resp.status}`);

    const data = await resp.json();
    if (!data.audio) throw new Error('No audio in response');

    // Decode base64 → blob → object URL
    const binary = atob(data.audio);
    const bytes  = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const blob   = new Blob([bytes], { type: data.format || 'audio/mpeg' });
    const url    = URL.createObjectURL(blob);

    const audio  = new Audio(url);
    currentAudio = audio;

    audio.onplay  = () => callbacks.onStart?.();
    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      callbacks.onEnd?.();
    };
    audio.onerror = (e) => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      console.warn('Audio playback error, falling back:', e);
      // Fall back to browser TTS
      speakText(text, agentConfig, callbacks);
    };

    await audio.play();

    return () => {
      audio.pause();
      URL.revokeObjectURL(url);
      currentAudio = null;
    };
  } catch (err) {
    console.warn('ElevenLabs unavailable, falling back to browser TTS:', err.message);
    // Fallback: browser speech synthesis
    if (isSpeechAvailable()) {
      const cancel = speakText(text, agentConfig, callbacks);
      return cancel;
    }
    callbacks.onEnd?.();
    return () => {};
  }
}

export function isElevenLabsPlaying() {
  return !!currentAudio && !currentAudio.paused;
}
