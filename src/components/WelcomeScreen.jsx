import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSession, getAllSessions, getLatestCompletedSession } from '../hooks/useFirestore';

const USER_CONFIG = {
  mekhi: {
    accent: '#00C8FF',
    accentGlow: 'rgba(0,200,255,0.14)',
    accentBorder: 'rgba(0,200,255,0.22)',
    accentFaint: 'rgba(0,200,255,0.08)',
    name: 'Mekhi',
    avatarName: "Kane — Mekhi's Guide",
    avatarImg: '/avatars/kane/portrait.jpg',
    welcomeMessages: [
      "Good to see you. Take your time and be real.",
      "You showed up. That already means something.",
      "No pressure. Just honesty. Let's go.",
      "I'm here with you every step of the way.",
      "This is your space. Be honest with yourself.",
    ],
    label: 'Sports & Media Careers',
    subtitle: 'Present, calm, encouraging.',
    description: 'This space is built to help you understand where you really are right now, what may be holding you back, and what direction actually fits your future.',
    bullets: ['your mindset and habits', 'what is helping or hurting your progress', 'what direction fits your strengths and goals'],
  },
  melvin: {
    accent: '#7C4DFF',
    accentGlow: 'rgba(124,77,255,0.14)',
    accentBorder: 'rgba(124,77,255,0.22)',
    accentFaint: 'rgba(124,77,255,0.08)',
    name: 'Melvin',
    avatarName: "Caleb — Melvin's Guide",
    avatarImg: '/avatars/caleb/portrait.jpg',
    welcomeMessages: [
      "Good to see you. Let's get clear and keep moving.",
      "Your future is being built right now. Stay focused.",
      "Be honest and aware. That is what makes results useful.",
      "This is your space. No judgment — just truth.",
      "Vision without consistency is just a wish. Let's build both.",
    ],
    label: 'Finance & Sports Business',
    subtitle: 'Present, steady, future-focused.',
    description: 'This space is built to help you get clear, stay honest, and understand what strengths, habits, and decisions can move your future forward.',
    bullets: ['how you think under pressure', 'what is helping or slowing your growth', 'what path best fits your goals and potential'],
  },
};

export default function WelcomeScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const cfg = USER_CONFIG[userId] || USER_CONFIG.mekhi;

  const [loading, setLoading] = useState(false);
  const [inProgressSession, setInProgressSession] = useState(null);
  const [hasCompletedSession, setHasCompletedSession] = useState(false);
  const [checking, setChecking] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const intervalRef = useRef(null);

  // Rotate avatar messages
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % cfg.welcomeMessages.length);
        setMsgVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [cfg.welcomeMessages.length]);

  useEffect(() => {
    async function checkSessions() {
      try {
        const [sessions, latest] = await Promise.all([
          getAllSessions(userId),
          getLatestCompletedSession(userId),
        ]);
        const inProgress = sessions.find(s => s.status === 'in_progress');
        setInProgressSession(inProgress || null);
        setHasCompletedSession(!!latest);
      } catch {}
      setChecking(false);
    }
    checkSessions();
  }, [userId]);

  async function handleBegin(forceNew = false) {
    setLoading(true);
    try {
      if (!forceNew && inProgressSession) {
        navigate(`/assessment/${userId}/${inProgressSession.id}`);
        return;
      }
      const sessionId = await createSession(userId);
      navigate(`/intro/${userId}/${sessionId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  const btn = {
    primary: {
      background: cfg.accent,
      color: '#03131A',
      fontWeight: 700,
      borderRadius: 14,
      padding: '14px 24px',
      border: 'none',
      cursor: 'pointer',
      fontSize: 16,
    },
    secondary: {
      background: 'rgba(255,255,255,0.04)',
      color: '#EAEAEA',
      fontWeight: 600,
      borderRadius: 14,
      padding: '14px 24px',
      border: '1px solid rgba(255,255,255,0.1)',
      cursor: 'pointer',
      fontSize: 16,
    },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 24%), linear-gradient(180deg, #050505 0%, #0A0A0A 100%)`,
      color: '#F5F5F5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      padding: '32px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 14px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.05)',
            color: cfg.accent,
            fontSize: 11,
            letterSpacing: 1.4,
            fontWeight: 800,
            textTransform: 'uppercase',
          }}>
            Life Direction Assessment System
          </div>
          <div style={{ color: '#6B7280', fontSize: 14 }}>
            {cfg.name} · Private Area
          </div>
        </header>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.9fr)',
          gap: 28,
          alignItems: 'start',
        }}>

          {/* LEFT — Main content */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
            borderRadius: 24,
            padding: 36,
            display: 'grid',
            gap: 24,
            alignContent: 'start',
          }}>
            {/* Label + Headline */}
            <div>
              <div style={{
                color: cfg.accent,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                Welcome Back
              </div>
              <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0, fontWeight: 900 }}>
                Welcome back, {cfg.name}.
              </h1>
            </div>

            {/* Description */}
            <p style={{ color: '#D4D4D4', fontSize: 19, lineHeight: 1.7, margin: 0 }}>
              {cfg.description}
            </p>

            {/* What this covers */}
            <div style={{
              padding: 20,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 13, color: cfg.accent, marginBottom: 12, fontWeight: 700, letterSpacing: 0.5 }}>
                What this assessment helps uncover
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: '#CFCFCF', fontSize: 16 }}>
                {cfg.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>

            {/* Buttons */}
            {checking ? (
              <div style={{ height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />
            ) : (
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {inProgressSession ? (
                  <>
                    <button
                      style={btn.primary}
                      disabled={loading}
                      onClick={() => handleBegin(false)}
                    >
                      {loading ? 'Loading…' : 'Continue Where I Left Off'}
                    </button>
                    <button
                      style={btn.secondary}
                      disabled={loading}
                      onClick={() => handleBegin(true)}
                    >
                      Start New Assessment
                    </button>
                  </>
                ) : (
                  <button
                    style={btn.primary}
                    disabled={loading}
                    onClick={() => handleBegin(false)}
                  >
                    {loading ? 'Starting…' : 'Begin Assessment'}
                  </button>
                )}
              </div>
            )}

            {/* Returning user links */}
            {hasCompletedSession && !checking && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20 }}>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginBottom: 12 }}>Returning? Jump back in:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <button
                    onClick={() => navigate(`/weekly/${userId}`)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 14,
                      background: cfg.accentFaint,
                      border: `1px solid ${cfg.accentBorder}`,
                      color: '#E5E5E5',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    <div style={{ color: cfg.accent, fontWeight: 700, marginBottom: 3 }}>Weekly Check-In</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Sundays at 7pm · 5–10 min</div>
                  </button>
                  <button
                    onClick={() => navigate(`/mini/${userId}`)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 14,
                      background: cfg.accentFaint,
                      border: `1px solid ${cfg.accentBorder}`,
                      color: '#E5E5E5',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    <div style={{ color: cfg.accent, fontWeight: 700, marginBottom: 3 }}>Monthly Check-In</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>Track your growth</div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Avatar panel */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 24,
            padding: 24,
            display: 'grid',
            gap: 18,
            alignContent: 'start',
          }}>
            <div style={{
              fontSize: 11,
              color: cfg.accent,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}>
              Your Guide
            </div>

            {/* Avatar portrait */}
            <div style={{
              borderRadius: 20,
              overflow: 'hidden',
              background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 40%), rgba(255,255,255,0.03)`,
              border: `1px solid ${cfg.accentBorder}`,
              minHeight: 280,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <img
                src={cfg.avatarImg}
                alt={cfg.avatarName}
                style={{
                  width: '100%',
                  height: 300,
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                  borderRadius: 20,
                }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            {/* Avatar name */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F3F3F3' }}>{cfg.avatarName}</div>
              <div style={{ color: '#9CA3AF', fontSize: 13, marginTop: 2 }}>{cfg.subtitle}</div>
            </div>

            {/* Rotating message */}
            <div style={{
              padding: 18,
              borderRadius: 16,
              background: cfg.accentFaint,
              border: `1px solid ${cfg.accentBorder}`,
              color: '#F0FBFF',
              fontSize: 16,
              lineHeight: 1.65,
              fontStyle: 'italic',
              minHeight: 72,
              transition: 'opacity 0.4s ease',
              opacity: msgVisible ? 1 : 0,
            }}>
              "{cfg.welcomeMessages[msgIndex]}"
            </div>
          </div>
        </div>

        {/* Mobile: stack on small screens */}
        <style>{`
          @media (max-width: 768px) {
            .welcome-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
