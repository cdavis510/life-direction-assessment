import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSession, getAllSessions, getLatestCompletedSession } from '../hooks/useFirestore';

const USER_ACCENTS = {
  mekhi: { text: 'text-mekhi', bg: 'bg-mekhi', border: 'border-mekhi', class: 'user-mekhi' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', border: 'border-melvin', class: 'user-melvin' },
};

export default function WelcomeScreen() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENTS[userId] || USER_ACCENTS.mekhi;
  const [loading, setLoading] = useState(false);
  const [inProgressSession, setInProgressSession] = useState(null);
  const [hasCompletedSession, setHasCompletedSession] = useState(false);
  const [checking, setChecking] = useState(true);

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
      navigate(`/assessment/${userId}/${sessionId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${accent.class}`}>
      <div className="w-full max-w-2xl animate-fade-in">

        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="text-white/40 text-sm hover:text-white/70 mb-8 flex items-center gap-2 transition-colors"
        >
          ← Back
        </button>

        <div className="card border border-white/10">
          <div className={`section-label ${accent.text} mb-6`}>Welcome</div>

          <div className="space-y-5 text-white/85 leading-relaxed">
            <p className={`text-2xl font-bold ${accent.text}`}>Welcome to Your Future Blueprint</p>

            <p>This is not a test.</p>
            <p>This is not about getting anything right or wrong.</p>
            <p>And this is not something you can fail.</p>

            <p>This is about <strong className="text-white">you</strong> — your life, your future, and who you want to become.</p>

            <p>I'm here to help you build a clear picture of:</p>
            <ul className="list-none space-y-1 pl-4">
              <li className="flex items-start gap-2"><span className={accent.text}>–</span> the life you want</li>
              <li className="flex items-start gap-2"><span className={accent.text}>–</span> the career you're aiming for</li>
              <li className="flex items-start gap-2"><span className={accent.text}>–</span> and whether your current habits are helping you get there</li>
            </ul>

            <div className="border-l-2 border-white/20 pl-4 space-y-2">
              <p>You don't need to impress me.</p>
              <p>You don't need to give "perfect" answers.</p>
            </div>

            <p>The only thing that matters here is <strong className="text-white">honesty</strong>. Because the more honest you are, the more accurate and useful your results will be.</p>

            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <p>Some questions may feel easy.</p>
              <p>Some may make you think.</p>
              <p>Some may feel uncomfortable — and that's okay.</p>
            </div>

            <p>Take your time. Answer based on what's <em>actually</em> true for you right now — not what you think you should say.</p>

            <p>Before we start, just remember this:</p>
            <p className={`font-semibold text-lg ${accent.text}`}>The goal is not to judge you. The goal is to help you understand yourself — and build a path to the life you want.</p>
          </div>

          <div className="mt-8 space-y-3">
            {checking ? (
              <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
            ) : (
              <>
                {inProgressSession && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleBegin(false)}
                      disabled={loading}
                      className={`btn-primary w-full ${accent.bg} text-navy font-bold text-lg focus:ring-${userId}`}
                    >
                      {loading ? 'Loading...' : 'Continue Where I Left Off'}
                    </button>
                    <button
                      onClick={() => handleBegin(true)}
                      disabled={loading}
                      className="btn-primary w-full bg-white/10 text-white/70 hover:bg-white/15"
                    >
                      Start a New Assessment
                    </button>
                  </div>
                )}
                {!inProgressSession && (
                  <button
                    onClick={() => handleBegin(false)}
                    disabled={loading}
                    className={`btn-primary w-full ${accent.bg} text-navy font-bold text-lg`}
                  >
                    {loading ? 'Starting...' : "I'm Ready — Let's Begin"}
                  </button>
                )}
                {/* Quick links for returning users */}
                {hasCompletedSession && (
                  <div className="pt-2 space-y-2">
                    <p className="text-white/30 text-xs text-center">Returning? Jump back in:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate(`/weekly/${userId}`)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs text-white/60 hover:text-white/80 text-left"
                      >
                        <span className={`block font-semibold mb-0.5 ${accent.text}`}>Weekly Check-In</span>
                        <span className="text-white/30">Sundays at 7pm · 5–10 min</span>
                      </button>
                      <button
                        onClick={() => navigate(`/mini/${userId}`)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs text-white/60 hover:text-white/80 text-left"
                      >
                        <span className={`block font-semibold mb-0.5 ${accent.text}`}>Monthly Check-In</span>
                        <span className="text-white/30">Track your growth</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
