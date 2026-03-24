// ─── RESULTS REVEAL — Score-first youth-facing comeback dashboard ──────────────
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllAnswers, getAllSessions, getSession, saveSessionScores, saveAnalysisResult, completeSessionImmediate } from '../hooks/useFirestore';
import { getMekhiAnalysis } from '../agents/mekhiAgent';
import { getMelvinAnalysis } from '../agents/melvinAgent';
import { buildResultsPackage, getScoreLabel, inferTraits, deriveCareerFraming, buildStudentProfile } from '../engines/scoreEngine';
import { USER_SECTIONS } from '../data/questions';
import { CAREER_BLUEPRINTS } from '../data/careerBlueprintData';

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

// ── Status label from score ───────────────────────────────────────────────────
function getStatusConfig(score) {
  if (score === null || score === undefined) return { label: 'Calculating…',                  color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)' };
  if (score < 35) return { label: 'Direction Needs Clarity First',         color: '#EF4444', bg: 'rgba(239,68,68,0.12)' };
  if (score < 50) return { label: 'Early Stage — Path Is Taking Shape',    color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' };
  if (score < 65) return { label: 'On Track with Structure Needed',        color: '#F59E0B', bg: 'rgba(245,158,11,0.10)' };
  return                 { label: 'Strong Direction & Pathway Fit',        color: '#10B981', bg: 'rgba(16,185,129,0.12)' };
}

// ── Sub-score cards ───────────────────────────────────────────────────────────
function getSubScores(cores) {
  if (!cores) return [
    { label: 'Career Direction Clarity', pct: null, summary: 'Calculating…' },
    { label: 'Education Readiness',      pct: null, summary: 'Calculating…' },
    { label: 'Personal Responsibility',  pct: null, summary: 'Calculating…' },
    { label: 'Self-Awareness',           pct: null, summary: 'Calculating…' },
  ];

  function toPercent(val) { return val === null ? null : Math.round((val / 10) * 100); }

  const careerClarity   = toPercent(cores.goalAlignment);
  const eduReadiness    = (cores.commitment !== null && cores.responsibility !== null)
    ? Math.round(((cores.commitment + cores.responsibility) / 2 / 10) * 100)
    : null;
  const responsibility  = toPercent(cores.responsibility);
  const awareness       = toPercent(cores.confidence);

  function summary(pct, high, mid, low) {
    if (pct === null) return 'Calculating…';
    if (pct >= 65) return high;
    if (pct >= 40) return mid;
    return low;
  }

  return [
    {
      label: 'Career Direction Clarity',
      pct: careerClarity,
      summary: summary(careerClarity,
        'You have a clear sense of where you want to go.',
        'Career direction is forming — needs focus.',
        'Clarifying your path is the priority right now.'),
    },
    {
      label: 'Education Readiness',
      pct: eduReadiness,
      summary: summary(eduReadiness,
        'You are ready to commit to an education path.',
        'Readiness is building — structure is the key.',
        'Building daily habits will unlock your readiness.'),
    },
    {
      label: 'Personal Responsibility',
      pct: responsibility,
      summary: summary(responsibility,
        'You take ownership of your outcomes.',
        'Ownership is growing — keep it consistent.',
        'Taking full ownership is your biggest lever right now.'),
    },
    {
      label: 'Self-Awareness',
      pct: awareness,
      summary: summary(awareness,
        'You see yourself and your patterns clearly.',
        'Self-knowledge is growing — stay honest.',
        'Deeper self-reflection will sharpen your direction.'),
    },
  ];
}

// ── Best-fit path logic ───────────────────────────────────────────────────────
function getBestPath(scores) {
  if (!scores) return null;
  const { overallScore, cores } = scores;
  const future   = cores?.goalAlignment   ?? 5;
  const academic = cores ? (cores.responsibility + cores.commitment) / 2 : 5;

  if (overallScore < 35) return {
    primary: { icon: '🏫', label: 'Community College Start',     desc: 'A lower-pressure academic environment to build your foundation and clarify your direction before committing to a 4-year path.' },
    backup:  { icon: '💼', label: 'Direct Career Track',          desc: 'Entry-level role in your field of interest while you clarify your education plan.' },
  };
  if (future > 6 && academic < 4) return {
    primary: { icon: '💼', label: 'Career-First Track',           desc: 'Your career direction is clear. Build real-world momentum now — education can follow with a focused plan.' },
    backup:  { icon: '🎓', label: '4-Year Degree Path',           desc: 'If you commit to the structure, the degree path aligns well with your goals.' },
  };
  if (overallScore >= 65) return {
    primary: { icon: '🎓', label: '4-Year Degree Path',           desc: 'Your direction and readiness align with a bachelor\'s degree track. This path leads directly to your career matches.' },
    backup:  { icon: '💼', label: 'Career-First with Part-Time School', desc: 'Work in your field while completing your degree on a flexible schedule.' },
  };
  return {
    primary: { icon: '🎓', label: '4-Year Degree Path',           desc: 'A structured degree program fits your direction. Focus on locking in your first semester plan.' },
    backup:  { icon: '🏫', label: 'Community College Transfer Path', desc: 'Start at a community college, transfer to a university after 2 years — lower cost, same outcome.' },
  };
}

// ── Next 3 steps ──────────────────────────────────────────────────────────────
function getNextMoves(scores) {
  const defaults = [
    'Review your top career match and look up the degree it requires',
    'Find 2 schools that offer that degree and compare their programs',
    'Talk to an advisor or counselor this week about your semester plan',
  ];
  if (!scores?.cores) return defaults;
  const { commitment, responsibility, goalAlignment, avoidanceRisk, independence } = scores.cores;
  const moves = [];
  if (goalAlignment > 6)    moves.push('Research your top career match — find 3 active job listings and note the degree they require');
  if (goalAlignment < 4)    moves.push('Write down 3 things you genuinely enjoy doing — use that to start building your direction');
  if (avoidanceRisk > 6)    moves.push('Identify the one next step you have been putting off and do it before the end of this week');
  if (commitment < 4)       moves.push('Pick one education goal and lock in a daily habit that moves you toward it');
  if (responsibility < 4)   moves.push('Meet with a school counselor or academic advisor — book it today, not later');
  if (independence < 4)     moves.push('Find one mentor or professional in your field and ask for a 15-minute conversation');
  while (moves.length < 3)  moves.push(defaults[moves.length]);
  return moves.slice(0, 3);
}

// ── Main export ───────────────────────────────────────────────────────────────
// NON-BLOCKING: Results shell renders immediately. AI generation runs in background.
// blueprintStatus: 'pending' | 'generating' | 'success' | 'failed'
export default function ResultsReveal() {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();
  const cfg = USER_CONFIG[userId] || USER_CONFIG.mekhi;

  const [pageLoading,      setPageLoading]      = useState(true);
  const [analysis,         setAnalysis]         = useState('');
  const [scores,           setScores]           = useState(null);
  const [blueprintStatus,  setBlueprintStatus]  = useState('pending');
  const [blueprintError,   setBlueprintError]   = useState('');
  const [previousSessions, setPreviousSessions] = useState([]);

  const savedAnswersRef = useRef(null);
  const pollRef         = useRef(null);

  useEffect(() => {
    load();
    return () => stopPolling();
  }, [userId, sessionId]);

  async function load() {
    console.log('[Results] load start', { userId, sessionId });
    try {
      const [answers, sessions] = await Promise.all([
        getAllAnswers(userId, sessionId),
        getAllSessions(userId),
      ]);
      savedAnswersRef.current = answers;

      const prev = sessions.filter(s => s.id !== sessionId && s.status === 'complete');
      setPreviousSessions(prev);

      // Build scores immediately — no AI dependency
      const sections = USER_SECTIONS[userId];
      if (sections) {
        try {
          const pkg = buildResultsPackage(answers, sections, userId);
          setScores(pkg);
          saveSessionScores(userId, sessionId, pkg).catch(err =>
            console.error('[Results] saveSessionScores failed:', err)
          );
        } catch (err) {
          console.error('[Results] buildResultsPackage failed:', err);
        }
      }

      const currentSession = sessions.find(s => s.id === sessionId);
      console.log('[Results] session status:', currentSession?.status, '| analysisStatus:', currentSession?.analysisStatus);

      // Analysis already complete — load from Firebase immediately
      if (currentSession?.analysisStatus === 'success' && (currentSession?.results || currentSession?.analysis)) {
        console.log('[Results] analysisStatus = success, loading from Firebase');
        setAnalysis(currentSession.results || currentSession.analysis);
        setBlueprintStatus('success');
        setPageLoading(false);
        return;
      }

      // Previously failed — show error with retry
      if (currentSession?.analysisStatus === 'failed') {
        console.log('[Results] analysisStatus = failed:', currentSession.analysisError);
        setBlueprintStatus('failed');
        setBlueprintError(currentSession.analysisError || 'Blueprint generation failed. Tap Retry.');
        setPageLoading(false);
        return;
      }

      // Legacy: session completed with results but no analysisStatus field
      if (currentSession?.status === 'complete' && currentSession?.results && !currentSession?.analysisStatus) {
        console.log('[Results] legacy completed session found');
        setAnalysis(currentSession.results);
        setBlueprintStatus('success');
        setPageLoading(false);
        return;
      }

      // Session not yet marked complete — mark it now (handles legacy flow where Assessment.jsx
      // didn't call completeSessionImmediate yet)
      if (!currentSession || currentSession.status !== 'complete') {
        console.log('[Results] session not complete — marking complete now');
        completeSessionImmediate(userId, sessionId).catch(err =>
          console.error('[Results] completeSessionImmediate failed:', err)
        );
      }

      // Show results shell immediately, generate in background
      setPageLoading(false);
      setBlueprintStatus('generating');
      console.log('[Submit] starting blueprint generation');
      runGeneration(answers, prev);
      startPolling();
    } catch (err) {
      console.error('[Results] load failed:', err);
      setPageLoading(false);
      setBlueprintStatus('failed');
      setBlueprintError('Failed to load your results. Please refresh the page.');
    }
  }

  async function runGeneration(answers, prev) {
    console.log('[Results] runGeneration start', { userId });
    try {
      const fn = userId === 'mekhi' ? getMekhiAnalysis : getMelvinAnalysis;
      const result = await fn(answers, prev);
      console.log('[Results] generation success — writing to Firebase');
      setAnalysis(result);
      setBlueprintStatus('success');
      stopPolling();
      await saveAnalysisResult(userId, sessionId, {
        analysis: result,
        analysisStatus: 'success',
        blueprintStatus: 'success',
        analysisCompletedAt: new Date().toISOString(),
        analysisError: null,
      });
      console.log('[Results] Firebase write success');
    } catch (err) {
      const msg = err.name === 'AbortError'
        ? 'Blueprint timed out. Tap Retry to try again.'
        : `Generation failed: ${err.message}`;
      console.error('[Results] generation failed:', msg);
      setBlueprintStatus('failed');
      setBlueprintError(msg);
      stopPolling();
      saveAnalysisResult(userId, sessionId, {
        analysisStatus: 'failed',
        blueprintStatus: 'failed',
        analysisError: msg,
      }).catch(e => console.error('[Results] failed to write error to Firebase:', e));
    }
  }

  function startPolling() {
    if (pollRef.current) return;
    pollRef.current = setInterval(async () => {
      try {
        const session = await getSession(userId, sessionId);
        console.log('[Results] polling analysisStatus:', session?.analysisStatus);
        if (session?.analysisStatus === 'success' && (session?.results || session?.analysis)) {
          console.log('[Results] analysisStatus = success (via poll)');
          setAnalysis(session.results || session.analysis);
          setBlueprintStatus('success');
          stopPolling();
        } else if (session?.analysisStatus === 'failed') {
          console.log('[Results] analysisStatus = failed (via poll)');
          setBlueprintStatus('failed');
          setBlueprintError(session.analysisError || 'Generation failed. Tap Retry.');
          stopPolling();
        }
      } catch (e) {
        console.error('[Results] poll error:', e);
      }
    }, 3000);
  }

  function stopPolling() {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }

  async function handleRetry() {
    if (!savedAnswersRef.current) return;
    console.log('[Retry] retry started');
    setBlueprintError('');
    setAnalysis('');
    setBlueprintStatus('generating');
    await saveAnalysisResult(userId, sessionId, {
      analysisStatus: 'pending',
      blueprintStatus: 'pending',
      analysisError: null,
    })
      .then(() => console.log('[Retry] analysisStatus set to pending'))
      .catch(e => console.error('[Retry] reset failed:', e));
    runGeneration(savedAnswersRef.current, previousSessions);
    startPolling();
  }

  if (pageLoading) {
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

  return (
    <ResultsDashboard
      cfg={cfg}
      analysis={analysis}
      blueprintStatus={blueprintStatus}
      blueprintError={blueprintError}
      scores={scores}
      userId={userId}
      sessionId={sessionId}
      previousSessions={previousSessions}
      navigate={navigate}
      onRetry={handleRetry}
    />
  );
}

// ─── Completion Screen ────────────────────────────────────────────────────────
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
      color: '#F5F5F5', fontFamily: 'Inter, sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32,
    }}>
      <div style={{ maxWidth: 860, width: '100%' }}>
        <div style={{
          textAlign: 'center', borderRadius: 24, padding: '44px 40px',
          background: `radial-gradient(circle at top, ${cfg.accentFaint}, rgba(255,255,255,0.02))`,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Assessment Complete
          </div>
          <h1 style={{ fontSize: 44, margin: '16px 0 14px', fontWeight: 900 }}>You finished, {cfg.name}.</h1>
          <p style={{ color: '#CDCDCD', fontSize: 19, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
            {cfg.completionSub}{' '}
            {previousSessions.length > 0 ? `This is assessment #${previousSessions.length + 1}.` : ''}
          </p>
          <div style={{
            margin: '28px auto 0', maxWidth: 400, padding: '18px 22px', borderRadius: 16,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#EAEAEA', fontSize: 17, fontStyle: 'italic',
          }}>
            {cfg.completionMsg}
          </div>
          <div style={{ marginTop: 28 }}>
            <button
              onClick={onViewResults} disabled={!canReveal}
              style={{
                background: canReveal ? cfg.accent : 'rgba(255,255,255,0.08)',
                color: canReveal ? '#03131A' : 'rgba(255,255,255,0.4)',
                fontWeight: 700, borderRadius: 14, padding: '16px 36px',
                border: 'none', cursor: canReveal ? 'pointer' : 'not-allowed',
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

// ─── Results Dashboard ────────────────────────────────────────────────────────
function ResultsDashboard({ cfg, analysis, blueprintStatus, blueprintError, scores, userId, sessionId, previousSessions, navigate, onRetry }) {
  const [expanded,      setExpanded]      = useState(null);
  const [checkedMoves,  setCheckedMoves]  = useState([]);

  const status    = getStatusConfig(scores?.overallScore ?? null);
  const subScores = getSubScores(scores?.cores ?? null);
  const bestPath  = getBestPath(scores);
  const moves     = getNextMoves(scores);
  const scorePct  = scores?.overallScore ?? null;

  function toggleExpand(key) { setExpanded(prev => prev === key ? null : key); }
  function toggleMove(i)     { setCheckedMoves(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]); }

  return (
    <div style={{
      minHeight: '100vh', background: '#08080A', color: '#F5F5F5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    }}>

      {/* ── BLUEPRINT STATUS BANNER (above fold, always visible) ────────── */}
      {blueprintStatus !== 'success' && (
        <div style={{
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, flexWrap: 'wrap',
          background: blueprintStatus === 'failed'
            ? 'rgba(239,68,68,0.08)'
            : 'rgba(255,255,255,0.04)',
          borderBottom: `1px solid ${blueprintStatus === 'failed' ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.07)'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {blueprintStatus !== 'failed' && (
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: cfg.accent, opacity: 0.7,
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
            )}
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>
              {blueprintStatus === 'failed'
                ? (blueprintError || 'Blueprint generation failed.')
                : 'Your blueprint is being generated. Your scores are ready below.'}
            </span>
          </div>
          {blueprintStatus === 'failed' && onRetry && (
            <button onClick={onRetry} style={{
              background: cfg.accent, color: '#08080A', border: 'none', borderRadius: 8,
              padding: '8px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', flexShrink: 0,
            }}>
              Retry
            </button>
          )}
        </div>
      )}

      {/* ── ABOVE THE FOLD ─────────────────────────────────────────────────── */}
      <div style={{
        minHeight: '100vh', padding: '28px 24px 36px',
        background: `radial-gradient(ellipse at top, ${cfg.accentGlow}, transparent 50%)`,
        display: 'flex', flexDirection: 'column',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, overflow: 'hidden',
                border: `2px solid ${cfg.accentBorder}`, flexShrink: 0,
                background: cfg.accentFaint,
              }}>
                <img src={cfg.avatarImg} alt={cfg.avatarName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                  {cfg.avatarName} · Life Direction Results
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#F5F5F5', lineHeight: 1.2 }}>
                  {cfg.name}'s Pathway Dashboard
                </div>
              </div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {previousSessions.length > 0 && <span style={{ marginLeft: 10 }}>· Session #{previousSessions.length + 1}</span>}
            </div>
          </div>

          {/* Score hero + sub-scores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start' }}>

            {/* Big score */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${cfg.accentBorder}`,
              borderRadius: 22, padding: '24px 28px',
              textAlign: 'center', minWidth: 180,
            }}>
              <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
                Pathway Score
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, lineHeight: 1, color: '#F5F5F5', letterSpacing: -2 }}>
                {scorePct ?? '—'}
              </div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.25)', marginBottom: 14 }}>/100</div>

              {/* Comeback meter */}
              <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 12 }}>
                <div style={{
                  width: `${scorePct ?? 0}%`, height: '100%',
                  background: `linear-gradient(90deg, ${status.color}aa, ${status.color})`,
                  borderRadius: 999, transition: 'width 1.2s ease',
                }} />
              </div>

              {/* Status badge */}
              <div style={{
                display: 'inline-block', padding: '6px 14px', borderRadius: 999,
                background: status.bg, color: status.color,
                fontSize: 12, fontWeight: 700,
              }}>
                {status.label}
              </div>
            </div>

            {/* Sub-score cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {subScores.map((s, i) => {
                const barColor = s.pct === null ? 'rgba(255,255,255,0.15)'
                  : s.pct >= 65 ? '#10B981' : s.pct >= 40 ? '#F59E0B' : '#EF4444';
                return (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16, padding: '16px 18px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{s.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: '#F5F5F5' }}>
                        {s.pct !== null ? s.pct : '—'}
                        {s.pct !== null && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>%</span>}
                      </div>
                    </div>
                    <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 10 }}>
                      <div style={{ width: `${s.pct ?? 0}%`, height: '100%', background: barColor, borderRadius: 999, transition: 'width 1s ease' }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{s.summary}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What this tells you */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
          }}>
            {[
              { label: 'Who you are',            desc: 'Your real behavioral patterns — honesty, ownership, consistency, self-awareness.' },
              { label: 'What path fits you',      desc: 'Careers and education paths matched to your actual profile, not just your stated interest.' },
              { label: 'What to do next',         desc: 'Concrete next steps toward the path that fits you best right now.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Primary CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'View My Education Blueprint', action: () => document.getElementById('career-section')?.scrollIntoView({ behavior: 'smooth' }), primary: true },
              { label: 'View My Best-Fit Path',        action: () => document.getElementById('best-path')?.scrollIntoView({ behavior: 'smooth' }), primary: false },
              { label: 'View Career Matches',          action: () => document.getElementById('career-section')?.scrollIntoView({ behavior: 'smooth' }), primary: false },
              { label: 'Full Results Breakdown',       action: () => document.getElementById('breakdown')?.scrollIntoView({ behavior: 'smooth' }), primary: false },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} style={{
                padding: '13px 20px', borderRadius: 12, border: 'none',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                background: btn.primary ? cfg.accent : 'rgba(255,255,255,0.07)',
                color: btn.primary ? '#03131A' : 'rgba(255,255,255,0.75)',
                border: btn.primary ? 'none' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.15s',
              }}>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Scroll hint */}
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 12, marginTop: 'auto', paddingTop: 8 }}>
            ↓ Scroll for your best-fit path, education blueprint, and career matches
          </div>
        </div>
      </div>

      {/* ── SECTION 2 — Path + Moves + Careers ─────────────────────────────── */}
      <div style={{ padding: '48px 24px', background: '#0A0A0C' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 28 }}>

          {/* Best Path + Next Moves side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

            {/* Best Path */}
            <div id="best-path" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: 24,
            }}>
              <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
                Best-Fit Path Right Now
              </div>
              {bestPath ? (
                <div style={{ display: 'grid', gap: 12 }}>
                  {/* Primary */}
                  <div style={{
                    padding: '16px 18px', borderRadius: 14,
                    background: `${cfg.accentFaint}`,
                    border: `1.5px solid ${cfg.accentBorder}`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 18 }}>{bestPath.primary.icon}</span>
                      <div>
                        <span style={{ fontSize: 10, color: cfg.accent, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Primary Recommendation</span>
                        <div style={{ color: '#F5F5F5', fontWeight: 800, fontSize: 15 }}>{bestPath.primary.label}</div>
                      </div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.6 }}>{bestPath.primary.desc}</div>
                  </div>
                  {/* Backup */}
                  <div style={{
                    padding: '14px 16px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16 }}>{bestPath.backup.icon}</span>
                      <div>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Backup Option</span>
                        <div style={{ color: '#D4D4D4', fontWeight: 700, fontSize: 14 }}>{bestPath.backup.label}</div>
                      </div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 1.6 }}>{bestPath.backup.desc}</div>
                  </div>
                </div>
              ) : (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Complete more of your assessment to see your best path.</div>
              )}
            </div>

            {/* Next 3 Moves */}
            <div id="next-moves" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: 24,
            }}>
              <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
                Your Next 3 Steps
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {moves.map((move, i) => {
                  const done = checkedMoves.includes(i);
                  return (
                    <div key={i}
                      onClick={() => toggleMove(i)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 14,
                        padding: '14px 16px', borderRadius: 14, cursor: 'pointer',
                        background: done ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${done ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}`,
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                        border: `2px solid ${done ? '#10B981' : 'rgba(255,255,255,0.2)'}`,
                        background: done ? '#10B981' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}>
                        {done && <span style={{ color: '#fff', fontSize: 13, fontWeight: 900 }}>✓</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, marginBottom: 3 }}>MOVE {i + 1}</div>
                        <div style={{
                          fontSize: 14, lineHeight: 1.55,
                          color: done ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.8)',
                          textDecoration: done ? 'line-through' : 'none',
                        }}>
                          {move}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => document.getElementById('career-section')?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  marginTop: 16, width: '100%', padding: '12px', borderRadius: 12,
                  background: cfg.accent, color: '#03131A',
                  border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
              >
                View My Education Blueprint →
              </button>
            </div>
          </div>

          {/* Career + Education Cards */}
          <div id="career-section">
            <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>
              Career &amp; Education Blueprint — Your Top Matches
            </div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginBottom: 16 }}>
              Each match includes the degree required and a semester-by-semester education path.
            </div>
            <CareerCards scores={scores} cfg={cfg} />
          </div>
        </div>
      </div>

      {/* ── SECTION 3 — Expandable Breakdown ─────────────────────────────────── */}
      <div id="breakdown" style={{ padding: '48px 24px 0', background: '#08080A' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>
            Full Breakdown
          </div>

          {/* Score dimensions accordion */}
          <Accordion
            id="scores-detail" label="Score Details — All 6 Dimensions"
            expanded={expanded === 'scores'} onToggle={() => toggleExpand('scores')} cfg={cfg}
          >
            {scores?.cores ? <ScoreDetails scores={scores} cfg={cfg} /> : <Placeholder />}
          </Accordion>

          {/* Risk flags */}
          {scores?.flags?.length > 0 && (
            <Accordion
              id="flags" label={`Risk Flags (${scores.flags.length} identified)`}
              expanded={expanded === 'flags'} onToggle={() => toggleExpand('flags')} cfg={cfg}
              accentColor="#EF4444"
            >
              <div style={{ display: 'grid', gap: 12 }}>
                {scores.flags.map(flag => (
                  <div key={flag.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0,
                      background: flag.severity === 'high' ? '#EF4444' : '#F59E0B',
                    }} />
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600 }}>{flag.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, lineHeight: 1.6 }}>{flag.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          )}

          {/* Full AI analysis */}
          <Accordion
            id="ai-analysis" label="Full AI Analysis"
            expanded={expanded === 'analysis'} onToggle={() => toggleExpand('analysis')} cfg={cfg}
          >
            {blueprintStatus === 'success' && analysis ? (
              <div
                style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: 15 }}
                dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}
              />
            ) : blueprintStatus === 'failed' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ color: 'rgba(239,68,68,0.8)', fontSize: 14 }}>{blueprintError || 'Generation failed.'}</div>
                {onRetry && (
                  <button onClick={onRetry} style={{
                    alignSelf: 'flex-start', background: cfg.accent, color: '#08080A',
                    border: 'none', borderRadius: 8, padding: '8px 18px',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  }}>
                    Retry
                  </button>
                )}
              </div>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: cfg.accent, opacity: 0.6, animation: 'pulse 1.5s infinite' }} />
                Your blueprint is being generated…
              </div>
            )}
          </Accordion>
        </div>
      </div>

      {/* ── BOTTOM ──────────────────────────────────────────────────────────── */}
      <div style={{ padding: '32px 24px 60px', background: '#08080A' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            padding: '24px 28px', borderRadius: 20,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              You have a direction.{' '}
              <span style={{ color: cfg.accent, fontWeight: 700 }}>The next step is deciding to commit to the path that fits you.</span>
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => navigate(`/history/${userId}`)} style={{
                padding: '11px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)', color: '#EAEAEA',
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}>
                View Assessment History
              </button>
              <button onClick={() => navigate(`/welcome/${userId}`)} style={{
                padding: '11px 18px', borderRadius: 10, border: 'none',
                background: cfg.accent, color: '#03131A',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}>
                Retake Assessment →
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── Career Cards ─────────────────────────────────────────────────────────────
function CareerCards({ scores, cfg }) {
  const [openBlueprint, setOpenBlueprint] = useState(null);

  const buckets = scores?.careerBuckets;
  const profile = scores?.studentProfile;

  if (!buckets) {
    return (
      <div style={{
        padding: '24px 20px', borderRadius: 16,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.7,
      }}>
        Career matches are generated from your full assessment answers. Complete more sections to see your personalized career matches.
      </div>
    );
  }

  const traits    = scores?.cores ? inferTraits(scores.cores) : null;
  const dreamDesc = deriveCareerFraming(traits);

  // Build ordered 4-card array from buckets
  const bucketCards = [
    buckets.bestOverallFit,
    buckets.hiddenFit,
    buckets.practicalStartingPath,
    buckets.longTermGrowthPath,
  ].filter(Boolean).map(m => {
    const bp = CAREER_BLUEPRINTS[m.id];
    return {
      ...m,
      blueprintTitle: bp?.title || m.title,
      pay:    m.compensation?.earlyCareer || m.payRange || '—',
      degree: m.requiredEducation?.degreeLabel || m.degree || "Bachelor's degree required",
      bp,
    };
  });

  if (!bucketCards.length) {
    return (
      <div style={{
        padding: '24px 20px', borderRadius: 16,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.7,
      }}>
        Complete more sections to see your personalized career matches.
      </div>
    );
  }

  const bestFit   = bucketCards.find(c => c.category === 'Best Overall Fit');
  const hiddenFit = bucketCards.find(c => c.category === 'You May Not Have Considered');
  const fitDesc   = bestFit
    ? `${bestFit.title} (${bestFit.matchScore}% match) — ranked #1 based on behavioral traits, not stated interest.`
    : 'Matched on actual behavioral traits, not stated interest alone.';

  return (
    <div style={{ display: 'grid', gap: 14 }}>

      {/* Dream vs Fit framing — dynamic */}
      <div style={{
        padding: '16px 20px', borderRadius: 14,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            What You May Think You Want
          </div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.6 }}>{dreamDesc}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
            What Your Profile Actually Fits
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.6 }}>
            {fitDesc}
            {hiddenFit && (
              <span style={{ display: 'block', marginTop: 6, color: '#F59E0B', fontWeight: 600, fontSize: 12 }}>
                Also see: {hiddenFit.title} — a role you may not have considered ({hiddenFit.matchScore}% fit).
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4 Bucket cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {bucketCards.map((card, i) => (
          <div key={i} style={{
            background: openBlueprint === i ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${openBlueprint === i ? cfg.accentBorder : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 18, padding: '18px 20px',
            display: 'flex', flexDirection: 'column', gap: 10, transition: 'all 0.2s',
          }}>
            {/* Category badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 999, alignSelf: 'flex-start',
              background: `${card.categoryColor}18`, border: `1px solid ${card.categoryColor}40`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: card.categoryColor }} />
              <span style={{ fontSize: 10, color: card.categoryColor, fontWeight: 800, letterSpacing: 0.8 }}>
                {card.category}
              </span>
            </div>

            {/* Title + match% */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ color: '#F5F5F5', fontWeight: 800, fontSize: 15, lineHeight: 1.3, flex: 1 }}>
                {card.blueprintTitle || card.title}
              </div>
              <div style={{ flexShrink: 0, textAlign: 'center', padding: '4px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: card.categoryColor, lineHeight: 1 }}>{card.matchScore}%</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>FIT</div>
              </div>
            </div>

            {/* Component scores mini-row */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { label: 'Trait', val: card.behavioralFit },
                { label: 'Style', val: card.workStyleFit },
                { label: 'Ready', val: card.readiness },
              ].map((s, j) => (
                <div key={j} style={{
                  padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                  background: 'rgba(255,255,255,0.05)',
                  color: s.val >= 65 ? '#10B981' : s.val >= 45 ? '#F59E0B' : '#EF4444',
                }}>
                  {s.label} {s.val}%
                </div>
              ))}
            </div>

            {/* Why matched */}
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6, flex: 1 }}>{card.whyMatched}</div>

            {/* Family tag */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>{card.family}</div>

            {/* Degree required */}
            <div style={{ padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>
                Degree Required
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600 }}>{card.degree}</div>
            </div>

            {/* Pay */}
            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', color: cfg.accent, fontSize: 12, fontWeight: 700, alignSelf: 'flex-start' }}>
              Entry: {card.pay}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                flex: 1, padding: '9px', borderRadius: 10, border: 'none',
                background: cfg.accent, color: '#03131A', fontWeight: 700, fontSize: 12, cursor: 'pointer',
              }}>
                View Jobs
              </button>
              <button
                onClick={() => setOpenBlueprint(openBlueprint === i ? null : i)}
                style={{
                  flex: 1, padding: '9px', borderRadius: 10,
                  border: `1px solid ${openBlueprint === i ? cfg.accentBorder : 'rgba(255,255,255,0.12)'}`,
                  background: openBlueprint === i ? cfg.accentFaint : 'rgba(255,255,255,0.04)',
                  color: openBlueprint === i ? cfg.accent : 'rgba(255,255,255,0.65)',
                  fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {openBlueprint === i ? 'Hide Blueprint' : 'Education Blueprint'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Education Blueprint expansion */}
      {openBlueprint !== null && bucketCards[openBlueprint] && (
        <EducationBlueprint card={bucketCards[openBlueprint]} cfg={cfg} />
      )}
    </div>
  );
}

// ─── Education Blueprint ──────────────────────────────────────────────────────
function EducationBlueprint({ card, cfg }) {
  const [activeTab, setActiveTab] = useState('degree');
  const bp = card?.bp;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${cfg.accentBorder}`,
      borderRadius: 20, padding: 28,
      animation: 'fadeIn 0.2s ease',
    }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>
            Education Blueprint
          </div>
          <div style={{ color: '#F5F5F5', fontWeight: 800, fontSize: 18 }}>{card.title}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 2 }}>{card.degree}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'degree',  label: 'Semester Plan' },
          { id: 'why',     label: 'Why This Fits' },
          { id: 'salary',  label: 'Salary Path' },
          { id: 'masters', label: "Master's Path" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', border: 'none',
            background: activeTab === tab.id ? cfg.accent : 'rgba(255,255,255,0.06)',
            color: activeTab === tab.id ? '#03131A' : 'rgba(255,255,255,0.5)',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'degree' && (
        <div>
          {bp?.undergraduatePlan?.semesters?.length > 0 ? (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 4 }}>
                {bp.undergraduatePlan.degree} · {bp.undergraduatePlan.totalCredits} credits · 4 years
              </div>
              {bp.undergraduatePlan.semesters.map((sem, i) => (
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
          ) : (
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, padding: '12px 0' }}>
              Detailed semester plan not yet available for this career path.<br />
              <span style={{ color: cfg.accent, fontWeight: 600 }}>Degree required: {card.degree}</span>
            </div>
          )}
        </div>
      )}

      {activeTab === 'why' && (
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.8 }}>
          {bp?.whyThisFits || card.why}
        </div>
      )}

      {activeTab === 'salary' && (
        <div style={{ display: 'grid', gap: 10 }}>
          {bp?.salary ? Object.values(bp.salary).map((level, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.04)',
            }}>
              <div>
                <div style={{ color: '#F5F5F5', fontSize: 13, fontWeight: 600 }}>{level.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{level.years}</div>
              </div>
              <div style={{ color: cfg.accent, fontWeight: 700, fontSize: 14 }}>{level.range}</div>
            </div>
          )) : (
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>Salary data coming soon for this path.</div>
          )}
        </div>
      )}

      {activeTab === 'masters' && (
        <div>
          {bp?.mastersPath ? (
            <div style={{ display: 'grid', gap: 14 }}>
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
          ) : (
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>Master's path data coming soon.</div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ label, expanded, onToggle, cfg, accentColor, children }) {
  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${expanded ? (accentColor || cfg.accentBorder) : 'rgba(255,255,255,0.08)'}`,
      background: expanded ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
      transition: 'border-color 0.2s',
    }}>
      <button onClick={onToggle} style={{
        width: '100%', padding: '16px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'none', border: 'none', cursor: 'pointer',
        color: expanded ? '#F5F5F5' : 'rgba(255,255,255,0.55)',
        fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
        textAlign: 'left',
      }}>
        {label}
        <span style={{ fontSize: 18, color: accentColor || cfg.accent, transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>
          ⌄
        </span>
      </button>
      {expanded && (
        <div style={{ padding: '4px 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Score Details ────────────────────────────────────────────────────────────
function ScoreDetails({ scores, cfg }) {
  const { cores } = scores;
  const dims = [
    { key: 'goalAlignment',  label: 'Goal Alignment',    invert: false },
    { key: 'responsibility', label: 'Responsibility',     invert: false },
    { key: 'independence',   label: 'Independence',       invert: false },
    { key: 'confidence',     label: 'Confidence',         invert: false },
    { key: 'commitment',     label: 'Commitment',         invert: false },
    { key: 'avoidanceRisk',  label: 'Avoidance Risk',     invert: true  },
  ];
  return (
    <div style={{ display: 'grid', gap: 14, paddingTop: 8 }}>
      {dims.map(({ key, label, invert }) => {
        const val = cores[key];
        if (val === null || val === undefined) return null;
        const pct     = Math.round((val / 10) * 100);
        const display = invert ? 100 - pct : pct;
        const color   = display >= 60 ? '#10B981' : display >= 40 ? '#F59E0B' : '#EF4444';
        return (
          <div key={key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{label}</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{getScoreLabel(invert ? 10 - val : val)}</span>
            </div>
            <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${display}%`, height: '100%', background: color, borderRadius: 999 }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Placeholder() {
  return <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Answer more questions to see full score details.</div>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatAnalysis(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<h2 style="color:#F5F5F5;font-size:17px;font-weight:800;margin:22px 0 8px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="color:#F5F5F5;font-size:15px;margin:16px 0 6px">$1</h3>')
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:6px">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>(\n|$))+/g, m => `<ul style="padding-left:20px;margin:10px 0">${m}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:10px 0">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p style="margin:10px 0">$1</p>')
    .replace(/<p[^>]*><\/p>/g, '');
}
