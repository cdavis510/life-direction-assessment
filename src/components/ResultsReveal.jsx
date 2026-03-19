// ─── SCREEN 07 — Completion Screen + SCREEN 08 — Results Dashboard ───────────
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllAnswers, getAllSessions, completeSession, saveSessionScores } from '../hooks/useFirestore';
import { getMekhiAnalysis } from '../agents/mekhiAgent';
import { getMelvinAnalysis } from '../agents/melvinAgent';
import { buildResultsPackage, getScoreLabel } from '../engines/scoreEngine';
import { USER_SECTIONS } from '../data/questions';
import { CAREER_BLUEPRINTS } from '../data/careerBlueprintData';
import LifestyleVisionCard from './LifestyleVisionCard';

const USER_CONFIG = {
  mekhi: {
    accent: '#00C8FF',
    accentGlow: 'rgba(0,200,255,0.12)',
    accentBorder: 'rgba(0,200,255,0.22)',
    accentFaint: 'rgba(0,200,255,0.07)',
    name: 'Mekhi',
    avatarImg: '/avatars/kane/portrait.jpg',
    avatarName: 'Kane',
    completionMsg: '"This is where it gets real."',
    summaryMsg: '"You\'re capable, but your habits need to catch up to your vision."',
    completionSub: 'You showed up and answered honestly. That matters.',
  },
  melvin: {
    accent: '#7C4DFF',
    accentGlow: 'rgba(124,77,255,0.12)',
    accentBorder: 'rgba(124,77,255,0.22)',
    accentFaint: 'rgba(124,77,255,0.07)',
    name: 'Melvin',
    avatarImg: '/avatars/caleb/portrait.jpg',
    avatarName: 'Caleb',
    completionMsg: '"Now let\'s turn insight into direction."',
    summaryMsg: '"You have vision, but consistency will decide how far you go."',
    completionSub: 'You showed up, thought it through, and finished strong. Your results are ready.',
  },
};

export default function ResultsReveal() {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();
  const cfg = USER_CONFIG[userId] || USER_CONFIG.mekhi;

  const [phase, setPhase] = useState('loading'); // loading | complete | generating | results
  const [analysis, setAnalysis] = useState('');
  const [scores, setScores] = useState(null);
  const [error, setError] = useState('');
  const [previousSessions, setPreviousSessions] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [answers, sessions] = await Promise.all([
          getAllAnswers(userId, sessionId),
          getAllSessions(userId),
        ]);
        const prev = sessions.filter(s => s.id !== sessionId && s.status === 'complete');
        setPreviousSessions(prev);

        const sections = USER_SECTIONS[userId];
        if (sections) {
          try {
            const pkg = buildResultsPackage(answers, sections, userId);
            setScores(pkg);
            saveSessionScores(userId, sessionId, pkg).catch(() => {});
          } catch {}
        }

        // ── Cache check: use stored analysis if session is already complete ──
        const currentSession = sessions.find(s => s.id === sessionId);
        if (currentSession?.status === 'complete' && currentSession?.results) {
          setAnalysis(currentSession.results);
          setPhase('complete');
          return;
        }

        setPhase('complete');
        generateAnalysis(answers, prev);
      } catch {
        setError('Something went wrong loading your results.');
        setPhase('results');
      }
    }
    load();
  }, [userId, sessionId]);

  async function generateAnalysis(answers, prev) {
    try {
      const fn = userId === 'mekhi' ? getMekhiAnalysis : getMelvinAnalysis;
      const result = await fn(answers, prev);
      setAnalysis(result);
      await completeSession(userId, sessionId, result);
    } catch {
      setAnalysis('');
      setError('We had an issue generating your full analysis. Your answers are saved.');
    }
  }

  function handleViewResults() {
    if (analysis) {
      setPhase('results');
    } else {
      setPhase('generating');
    }
  }

  useEffect(() => {
    if (phase === 'generating' && analysis) setPhase('results');
  }, [phase, analysis]);

  // ── Screen 07 — Completion ──
  if (phase === 'loading') {
    return (
      <div style={{
        minHeight: '100vh', background: '#08080A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontSize: 14,
      }}>
        Loading your results…
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <CompletionScreen
        cfg={cfg}
        previousSessions={previousSessions}
        onViewResults={handleViewResults}
      />
    );
  }

  if (phase === 'generating') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 28%), #08080A`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter, sans-serif', color: '#F5F5F5',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 460 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: cfg.accentFaint, border: `1px solid ${cfg.accentBorder}`,
            margin: '0 auto 24px',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <style>{`@keyframes pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }`}</style>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)', marginBottom: 10 }}>
            Building your blueprint…
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
            Your answers are being analyzed. This takes a moment.
          </p>
        </div>
      </div>
    );
  }

  // ── Screen 08 — Results Dashboard ──
  return (
    <ResultsDashboard
      cfg={cfg}
      analysis={analysis}
      scores={scores}
      error={error}
      userId={userId}
      sessionId={sessionId}
      previousSessions={previousSessions}
      navigate={navigate}
    />
  );
}

// ─── Screen 07 — Completion Screen ───────────────────────────────────────────
function CompletionScreen({ cfg, previousSessions, onViewResults }) {
  const [canReveal, setCanReveal] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCanReveal(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 28%), #08080A`,
      color: '#F5F5F5',
      fontFamily: 'Inter, sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }}>
      <div style={{ maxWidth: 860, width: '100%' }}>
        <div style={{
          textAlign: 'center',
          borderRadius: 24,
          padding: '44px 40px',
          background: `radial-gradient(circle at top, ${cfg.accentFaint}, rgba(255,255,255,0.02))`,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Assessment Complete
          </div>
          <h1 style={{ fontSize: 44, margin: '16px 0 14px', fontWeight: 900 }}>
            You finished, {cfg.name}.
          </h1>
          <p style={{ color: '#CDCDCD', fontSize: 19, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
            {cfg.completionSub}{' '}
            {previousSessions.length > 0 ? `This is assessment #${previousSessions.length + 1}.` : ''}
          </p>

          {/* Avatar message */}
          <div style={{
            margin: '28px auto 0',
            maxWidth: 400,
            padding: '18px 22px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#EAEAEA',
            fontSize: 17,
            fontStyle: 'italic',
          }}>
            {cfg.completionMsg}
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              onClick={onViewResults}
              disabled={!canReveal}
              style={{
                background: canReveal ? cfg.accent : 'rgba(255,255,255,0.08)',
                color: canReveal ? '#03131A' : 'rgba(255,255,255,0.4)',
                fontWeight: 700, borderRadius: 14,
                padding: '16px 36px', border: 'none',
                cursor: canReveal ? 'pointer' : 'not-allowed',
                fontSize: 17, transition: 'all 0.3s',
              }}
            >
              {canReveal ? 'View My Results →' : 'Preparing your results…'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 08 — Results Dashboard ───────────────────────────────────────────
function ResultsDashboard({ cfg, analysis, scores, error, userId, sessionId, previousSessions, navigate }) {
  const completedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080A',
      color: '#F5F5F5',
      fontFamily: 'Inter, sans-serif',
      padding: '40px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 28 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 }}>
              Private Results
            </div>
            <h1 style={{ fontSize: 42, margin: 0, fontWeight: 900 }}>{cfg.name}'s Results</h1>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, paddingTop: 8 }}>
            Completed {completedDate}
            {previousSessions.length > 0 && (
              <div style={{ fontSize: 12, marginTop: 4 }}>Assessment #{previousSessions.length + 1}</div>
            )}
          </div>
        </div>

        {/* Two-column main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 24, alignItems: 'start' }}>

          {/* LEFT — Avatar summary */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 22,
            padding: 24,
            display: 'grid',
            gap: 18,
            alignContent: 'start',
          }}>
            {/* Portrait */}
            <div style={{
              borderRadius: 18,
              overflow: 'hidden',
              background: `radial-gradient(circle at top, ${cfg.accentFaint}, transparent)`,
              border: `1px solid ${cfg.accentBorder}`,
              height: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={cfg.avatarImg}
                alt={cfg.avatarName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            <div style={{ fontSize: 13, color: cfg.accent, fontWeight: 700 }}>
              {cfg.avatarName} — Your Guide
            </div>

            {/* Summary quote */}
            <div style={{
              padding: '16px 18px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              color: '#F2F2F2',
              lineHeight: 1.7,
              fontSize: 15,
              fontStyle: 'italic',
            }}>
              {cfg.summaryMsg}
            </div>

            {/* Score if available */}
            {scores && (
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: '#F5F5F5', lineHeight: 1 }}>{scores.overallScore}</span>
                  <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 18, marginBottom: 4 }}>/100</span>
                  <span style={{
                    marginLeft: 'auto',
                    padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                    background: scores.riskLevel === 'High' ? 'rgba(239,68,68,0.15)' : scores.riskLevel === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                    color: scores.riskLevel === 'High' ? '#FCA5A5' : scores.riskLevel === 'Medium' ? '#FCD34D' : '#6EE7B7',
                  }}>
                    {scores.riskLevel} Risk
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{ width: `${scores.overallScore}%`, height: '100%', background: cfg.accent, transition: 'width 1s ease' }} />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — 6 Result Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {getResultCards(analysis, scores, cfg).map((card, i) => (
              <div key={i} style={{
                padding: 22, borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 160,
              }}>
                <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
                  {card.title}
                </div>
                <div style={{ color: '#F1F1F1', lineHeight: 1.75, fontSize: 15 }}>
                  {card.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Dimensions */}
        {scores?.cores && <ScoreDimensions scores={scores} cfg={cfg} />}

        {/* Full AI Analysis */}
        {(analysis || error) && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 22, padding: 30,
          }}>
            <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 18 }}>
              Your Full Analysis
            </div>
            {error && !analysis && (
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>{error}</div>
            )}
            {analysis ? (
              <div
                style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontSize: 16 }}
                dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: cfg.accent, opacity: 0.6, animation: 'pulse 1.5s infinite' }} />
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>Analysis generating…</span>
              </div>
            )}
          </div>
        )}

        {/* Career Blueprint */}
        {scores?.careerMatches?.length > 0 && (
          <CareerBlueprintSection matches={scores.careerMatches} cfg={cfg} />
        )}

        {/* Lifestyle Vision */}
        {scores?.lifestyleBudget && (
          <LifestyleVisionCard lifestyleBudget={scores.lifestyleBudget} accent={{ hex: cfg.accent, text: '', bg: '', class: '' }} />
        )}

        {/* Final thought */}
        <div style={{
          padding: '32px 28px',
          borderRadius: 22,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.9, margin: 0 }}>
            <strong style={{ color: '#F5F5F5' }}>Final Thought</strong><br /><br />
            You said you want a certain kind of life.<br />
            This is your opportunity to decide:<br />
            <span style={{ color: cfg.accent, fontWeight: 700 }}>
              Is that life worth the effort it will take to get there?
            </span>
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate(`/history/${userId}`)}
            style={{
              flex: 1, minWidth: 200,
              background: 'rgba(255,255,255,0.05)',
              color: '#EAEAEA', fontWeight: 600, borderRadius: 14,
              padding: '14px 22px', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', fontSize: 15,
            }}
          >
            View Session History
          </button>
          <button
            onClick={() => navigate(`/welcome/${userId}`)}
            style={{
              flex: 1, minWidth: 200,
              background: cfg.accent,
              color: '#03131A', fontWeight: 700, borderRadius: 14,
              padding: '14px 22px', border: 'none',
              cursor: 'pointer', fontSize: 15,
            }}
          >
            Back to Home →
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Score Dimensions ─────────────────────────────────────────────────────────
function ScoreDimensions({ scores, cfg }) {
  const { cores, flags } = scores;
  const dims = [
    { key: 'goalAlignment', label: 'Goal Alignment' },
    { key: 'responsibility', label: 'Responsibility' },
    { key: 'independence', label: 'Independence' },
    { key: 'confidence', label: 'Confidence' },
    { key: 'commitment', label: 'Commitment' },
    { key: 'avoidanceRisk', label: 'Avoidance Risk', invert: true },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 24 }}>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 24 }}>
        <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 18 }}>Core Dimensions</div>
        <div style={{ display: 'grid', gap: 14 }}>
          {dims.map(({ key, label, invert }) => {
            const val = cores[key];
            if (val === null || val === undefined) return null;
            const pct = Math.round((val / 10) * 100);
            const display = invert ? 100 - pct : pct;
            const color = display >= 60 ? '#10B981' : display >= 40 ? '#F59E0B' : '#EF4444';
            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{getScoreLabel(invert ? 10 - val : val)}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${display}%`, height: '100%', background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {flags?.length > 0 && (
        <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 22, padding: 24 }}>
          <div style={{ color: '#FCA5A5', fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 18 }}>Areas Needing Attention</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {flags.slice(0, 4).map(flag => (
              <div key={flag.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0, background: flag.severity === 'high' ? '#EF4444' : '#F59E0B' }} />
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600 }}>{flag.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 2, lineHeight: 1.5 }}>{flag.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Career Blueprint ─────────────────────────────────────────────────────────
function CareerBlueprintSection({ matches, cfg }) {
  const [activeCareer, setActiveCareer] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const enriched = matches.map(m => ({ ...m, blueprint: CAREER_BLUEPRINTS[m.id] || null }));
  const current = enriched[activeCareer];
  const bp = current?.blueprint;

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 28 }}>
      <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Your Career Blueprint</div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 20, marginTop: 0 }}>
        Matched careers in sports. Tap each to see the full path: degree, classes, salary, companies, and masters track.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {enriched.map((c, i) => (
          <button key={i} onClick={() => { setActiveCareer(i); setActiveTab('overview'); }} style={{
            padding: 14, borderRadius: 16, textAlign: 'left', cursor: 'pointer',
            background: activeCareer === i ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeCareer === i ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
          }}>
            <div style={{ fontSize: 11, color: activeCareer === i ? cfg.accent : 'rgba(255,255,255,0.3)', fontWeight: 700, marginBottom: 5 }}>
              {i === 0 ? '#1 Match' : `Match ${i + 1}`}
            </div>
            <div style={{ color: '#F1F1F1', fontSize: 13, fontWeight: 600 }}>{c.blueprint?.title || c.title}</div>
          </button>
        ))}
      </div>
      {bp && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
            {['overview','companies','degree','masters'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap', border: 'none',
                background: activeTab === tab ? cfg.accent : 'rgba(255,255,255,0.06)',
                color: activeTab === tab ? '#03131A' : 'rgba(255,255,255,0.5)',
              }}>
                {tab === 'overview' ? 'Overview' : tab === 'companies' ? 'Companies' : tab === 'degree' ? 'Degree Plan' : 'Masters Path'}
              </button>
            ))}
          </div>
          <CareerTabContent tab={activeTab} bp={bp} cfg={cfg} />
        </>
      )}
    </div>
  );
}

function CareerTabContent({ tab, bp, cfg }) {
  if (tab === 'overview') return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <div style={{ color: '#F5F5F5', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{bp.title}</div>
        {bp.alternativeTitles && <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Also: {bp.alternativeTitles.slice(0,2).join(', ')}</div>}
      </div>
      {bp.whyThisFits && (
        <div style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Why This Fits You</div>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{bp.whyThisFits}</p>
        </div>
      )}
      {bp.salary && (
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Salary Over Time</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {Object.values(bp.salary).map((level, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
                <div>
                  <div style={{ color: '#F5F5F5', fontSize: 13, fontWeight: 600 }}>{level.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{level.years}</div>
                </div>
                <div style={{ color: cfg.accent, fontWeight: 700, fontSize: 14 }}>{level.range}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  if (tab === 'companies') return (
    <div style={{ display: 'grid', gap: 20 }}>
      {[{ label: '🇺🇸 USA', data: bp.usCompanies }, { label: '🇨🇦 Canada', data: bp.canadaCompanies }].map(({ label, data }) => data?.length > 0 && (
        <div key={label}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{label}</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {data.map((co, i) => (
              <div key={i} style={{ padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <div style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 600 }}>{co.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{co.location} · {co.type}</div>
                </div>
                <a href={`https://${co.url}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: 8, background: cfg.accent, color: '#03131A', fontWeight: 700, fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Jobs →</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  if (tab === 'degree' && bp.undergraduatePlan) return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ color: '#F5F5F5', fontWeight: 700 }}>{bp.undergraduatePlan.degree}</div>
      <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>{bp.undergraduatePlan.totalCredits} credits · 4 years · 8 semesters</div>
      {bp.undergraduatePlan.semesters?.map((sem, i) => (
        <div key={i} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#F5F5F5', fontWeight: 700, fontSize: 13 }}>{sem.term}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{sem.credits} credits</span>
          </div>
          <div style={{ padding: '12px 16px' }}>
            {sem.focus && <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontStyle: 'italic', marginBottom: 8 }}>{sem.focus}</div>}
            {sem.courses?.map((c, j) => (
              <div key={j} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ color: cfg.accent }}>·</span>{c}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  if (tab === 'masters' && bp.mastersPath) return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ padding: 16, borderRadius: 14, background: 'rgba(255,255,255,0.04)' }}>
        <div style={{ color: '#F5F5F5', fontWeight: 700, marginBottom: 4 }}>{bp.mastersPath.degree}</div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 10 }}>{bp.mastersPath.duration}</div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{bp.mastersPath.whyGetIt}</p>
      </div>
      {bp.mastersPath.rolesUnlocked?.map((role, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
          <span style={{ color: '#F5F5F5', fontSize: 14, fontWeight: 600 }}>{role.title}</span>
          <span style={{ color: cfg.accent, fontWeight: 700 }}>{role.salary}</span>
        </div>
      ))}
    </div>
  );
  return null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getResultCards(analysis, scores, cfg) {
  const defaults = [
    { title: 'Future Direction',    body: 'Your personalized analysis is loading…' },
    { title: 'Strengths',           body: 'Identified from your answers…' },
    { title: 'Patterns to Address', body: 'Areas flagged for your attention…' },
    { title: 'Behavior vs. Dream',  body: 'The honest read on where you are…' },
    { title: 'Next Steps',          body: 'Specific actions coming…' },
    { title: 'Words for You',       body: 'Personal message incoming…' },
  ];

  if (!analysis) return defaults;

  // Parse ## section headers from the structured AI output
  const sectionMap = {};
  const parts = analysis.split(/^## /m);
  for (const part of parts) {
    if (!part.trim()) continue;
    const newlineIdx = part.indexOf('\n');
    if (newlineIdx === -1) continue;
    const header = part.slice(0, newlineIdx).trim().toLowerCase();
    const body   = part.slice(newlineIdx + 1).trim();
    sectionMap[header] = body;
  }

  function findSection(...keys) {
    for (const k of keys) {
      const kl = k.toLowerCase();
      const match = Object.entries(sectionMap).find(([h]) => h.includes(kl));
      if (match) return match[1];
    }
    return null;
  }

  function excerpt(text, maxChars = 260) {
    if (!text) return '';
    const clean = text.replace(/[#*_]/g, '').replace(/\n+/g, ' ').trim();
    if (clean.length <= maxChars) return clean;
    const cut = clean.slice(0, maxChars);
    const lastPeriod = cut.lastIndexOf('.');
    return lastPeriod > 60 ? cut.slice(0, lastPeriod + 1) : cut + '…';
  }

  const CARD_SPECS = [
    { title: 'Future Direction',    keys: ['future identity'] },
    { title: 'Strengths',           keys: ['strengths (what', 'strengths'] },
    { title: 'Patterns to Address', keys: ['patterns holding', 'patterns to watch', 'patterns'] },
    { title: 'Behavior vs. Dream',  keys: ['behavior vs', 'dream alert'] },
    { title: 'Next Steps',          keys: ['recommended next', 'next steps'] },
    { title: 'Words for You',       keys: ['words back', 'words for'] },
  ];

  return CARD_SPECS.map((spec, i) => {
    const body = excerpt(findSection(...spec.keys));
    return body ? { title: spec.title, body } : defaults[i];
  });
}

function formatAnalysis(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#F5F5F5;font-size:18px;margin:24px 0 10px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="color:#F5F5F5;font-size:16px;margin:18px 0 8px">$1</h3>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:6px">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>(\n|$))+/g, match => `<ul style="padding-left:20px;margin:10px 0">${match}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:12px 0">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p style="margin:12px 0">$1</p>')
    .replace(/<p[^>]*><\/p>/g, '');
}
