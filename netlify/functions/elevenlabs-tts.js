// ─── ELEVENLABS TTS PROXY ─────────────────────────────────────────────────────
// Keeps the ElevenLabs API key on the server side.
// POST body: { text: string, voiceId: string }
// Returns: audio/mpeg binary stream
// ─────────────────────────────────────────────────────────────────────────────

const VOICE_IDS = {
  quinn: process.env.ELEVENLABS_VOICE_ID_QUINN || 'aIBLn5nOLpISweYWEoFO',
  kane:  process.env.ELEVENLABS_VOICE_ID_KANE  || 'OzJbpd370Vf7oEO1DMnO',
  caleb: process.env.ELEVENLABS_VOICE_ID_CALEB || 'u1du0GTEA0AlsgRcsmvS',
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { statusCode: 503, body: JSON.stringify({ error: 'ElevenLabs not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { text, agentId } = body;
  if (!text || !text.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'text is required' }) };
  }

  const voiceId = VOICE_IDS[agentId] || VOICE_IDS.quinn;

  try {
    const elResp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: text.slice(0, 2500), // ElevenLabs limit guard
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.1,
          use_speaker_boost: true,
        },
      }),
    });

    if (!elResp.ok) {
      const errText = await elResp.text().catch(() => '');
      console.error('ElevenLabs error:', elResp.status, errText);
      return {
        statusCode: elResp.status,
        body: JSON.stringify({ error: `ElevenLabs returned ${elResp.status}` }),
      };
    }

    const audioBuffer = await elResp.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio: base64Audio, format: 'audio/mpeg' }),
    };
  } catch (err) {
    console.error('ElevenLabs fetch failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'TTS request failed' }),
    };
  }
};
