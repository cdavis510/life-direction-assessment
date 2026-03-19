// ─── SCREEN 03 — Assessment Intro / Before You Start ─────────────────────────
import { useNavigate, useParams } from 'react-router-dom';

const USER_CONFIG = {
  mekhi: {
    accent: '#00C8FF',
    accentGlow: 'rgba(0,200,255,0.12)',
    accentBorder: 'rgba(0,200,255,0.22)',
    accentFaint: 'rgba(0,200,255,0.07)',
    name: 'Mekhi',
    avatarImg: '/avatars/kane/portrait.jpg',
    avatarMsg: '"Just be real. That\'s all."',
    introCopy: [
      'This is not a test.',
      'You do not need perfect answers.',
      'You just need honest ones.',
    ],
    introSub: 'This assessment helps us better understand your mindset, your habits, your direction, and what may need to change for you to move forward.',
  },
  melvin: {
    accent: '#7C4DFF',
    accentGlow: 'rgba(124,77,255,0.12)',
    accentBorder: 'rgba(124,77,255,0.22)',
    accentFaint: 'rgba(124,77,255,0.07)',
    name: 'Melvin',
    avatarImg: '/avatars/caleb/portrait.jpg',
    avatarMsg: '"Be honest. Build from there."',
    introCopy: [
      'This is not about being perfect.',
      'It is about being honest and aware.',
      'That is what makes the results useful.',
    ],
    introSub: 'This assessment helps uncover your mindset, your consistency, your strengths, and the direction that can best support your future.',
  },
};

export default function AssessmentIntro() {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();
  const cfg = USER_CONFIG[userId] || USER_CONFIG.mekhi;
  const sid = sessionId;

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 26%), linear-gradient(180deg, #050505 0%, #0A0A0A 100%)`,
      color: '#F5F5F5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: 920 }}>

        {/* Back */}
        <button
          onClick={() => navigate(`/welcome/${userId}`)}
          style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 28, padding: 0 }}
        >
          ← Back
        </button>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          borderRadius: 24,
          padding: 36,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{
              color: cfg.accent,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>
              Before You Start
            </div>

            <h1 style={{ fontSize: 40, lineHeight: 1.08, margin: '0 0 28px', fontWeight: 900 }}>
              Before you start, {cfg.name}
            </h1>

            <div style={{ display: 'grid', gap: 16, fontSize: 20, lineHeight: 1.75, color: '#E8E8E8' }}>
              {cfg.introCopy.map(line => (
                <p key={line} style={{ margin: 0 }}>{line}</p>
              ))}
              <p style={{ margin: 0, color: '#C0C0C0', fontSize: 18 }}>
                {cfg.introSub}
              </p>
            </div>

            <button
              onClick={() => navigate(`/assessment/${userId}/${sid}`)}
              style={{
                marginTop: 32,
                background: cfg.accent,
                color: '#03131A',
                fontWeight: 700,
                borderRadius: 14,
                padding: '15px 28px',
                border: 'none',
                cursor: 'pointer',
                fontSize: 17,
              }}
            >
              Start My Assessment
            </button>
          </div>

          {/* Avatar badge — bottom right */}
          <div style={{
            position: 'absolute',
            right: 28,
            bottom: 28,
            width: 190,
            padding: 18,
            borderRadius: 18,
            background: cfg.accentFaint,
            border: `1px solid ${cfg.accentBorder}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <img
                src={cfg.avatarImg}
                alt=""
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `1px solid ${cfg.accentBorder}` }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{ fontWeight: 700, fontSize: 13, color: cfg.accent }}>Your Guide</div>
            </div>
            <div style={{ color: '#EAFBFF', fontSize: 14, lineHeight: 1.55, fontStyle: 'italic' }}>
              {cfg.avatarMsg}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
