// ─── SCREEN 04 — Question Screen + Screen 06 — Save Progress Modal ───────────
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_SECTIONS } from '../data/questions';
import { saveAnswer, updateSessionProgress, getSession, getAllAnswers, completeSessionImmediate, loadUserQuestions } from '../hooks/useFirestore';

const USER_CONFIG = {
  mekhi: {
    accent: '#00C8FF',
    accentGlow: 'rgba(0,200,255,0.12)',
    accentBorder: 'rgba(0,200,255,0.20)',
    accentFaint: 'rgba(0,200,255,0.07)',
    name: 'Mekhi',
    avatarImg: '/avatars/kane/portrait.jpg',
    avatarName: 'Kane',
    supportMessages: [
      "You're doing fine. Keep going.",
      "Take your time with this one.",
      "Be honest — that's all that matters.",
      "No wrong answers here.",
      "Stay focused. You've got this.",
      "Think about what's actually true for you.",
      "Every answer moves you forward.",
      "Real talk only. I got you.",
      "You're further along than you think.",
      "Keep it real. That's the whole point.",
    ],
  },
  melvin: {
    accent: '#8B5CF6',
    accentGlow: 'rgba(139,92,246,0.12)',
    accentBorder: 'rgba(139,92,246,0.20)',
    accentFaint: 'rgba(139,92,246,0.07)',
    name: 'Melvin',
    avatarImg: '/avatars/caleb/portrait.jpg',
    avatarName: 'Caleb',
    supportMessages: [
      "Stay with it. You've got this.",
      "Honest answers only. That's it.",
      "Think carefully. No rush.",
      "Your future depends on your honesty.",
      "Keep going. You're building something real.",
      "This matters. Stay focused.",
      "Every question brings you closer.",
      "Be real with yourself right now.",
      "You're doing the work. Keep it up.",
      "Almost there. Stay honest.",
    ],
  },
};

export default function Assessment() {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();
  const cfg = USER_CONFIG[userId] || USER_CONFIG.mekhi;

  const [sections, setSections]                 = useState(USER_SECTIONS[userId] || USER_SECTIONS.mekhi);
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [answers, setAnswers]                   = useState({});
  const [saving, setSaving]                     = useState(false);
  const [justSaved, setJustSaved]               = useState(false);
  const [loading, setLoading]                   = useState(true);
  const [nextEnabled, setNextEnabled]           = useState(false);
  const [showPause, setShowPause]               = useState(false);
  const [pauseNextSection, setPauseNextSection] = useState(null);
  const [showSaveModal, setShowSaveModal]       = useState(false);
  const [showSectionIntro, setShowSectionIntro] = useState(false);
  const [msgIndex, setMsgIndex]                 = useState(0);
  const [msgVisible, setMsgVisible]             = useState(true);
  const timerRef    = useRef(null);
  const msgTimerRef = useRef(null);

  const allQuestions = sections.flatMap(section =>
    section.questions.filter(Boolean).map(q => ({ ...q, sectionId: section.id, sectionTitle: section.title }))
  );
  const totalQuestions = allQuestions.length;

  // Load questions from Firebase, then restore progress
  useEffect(() => {
    async function init() {
      // 1. Load question bank from Firebase (Mekhi uses Firebase source of truth)
      let activeSections = USER_SECTIONS[userId] || USER_SECTIONS.mekhi;
      try {
        const fbSections = await loadUserQuestions(userId);
        if (fbSections?.length > 0) activeSections = fbSections;
      } catch (err) {
        console.warn('[Assessment] Firebase question load failed, using hardcoded fallback:', err.message);
      }
      setSections(activeSections);

      // 2. Restore saved progress
      const fbTotal = activeSections.flatMap(s => s.questions.filter(Boolean)).length;
      let restoredIndex = 0;
      try {
        const [session, savedAnswers] = await Promise.all([
          getSession(userId, sessionId),
          getAllAnswers(userId, sessionId),
        ]);
        if (savedAnswers) setAnswers(savedAnswers);
        if (session?.currentQuestion) {
          restoredIndex = Math.min(session.currentQuestion, fbTotal - 1);
          setCurrentIndex(restoredIndex);
        }
      } catch {}
      setShowSectionIntro(restoredIndex === 0);
      setLoading(false);
    }
    init();
  }, [userId, sessionId]);

  // 0.5-second minimum before Next
  useEffect(() => {
    setNextEnabled(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNextEnabled(true), 500);
    return () => clearTimeout(timerRef.current);
  }, [currentIndex]);

  // Rotate support messages
  useEffect(() => {
    msgTimerRef.current = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % cfg.supportMessages.length);
        setMsgVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(msgTimerRef.current);
  }, [cfg.supportMessages.length]);

  const currentQuestion  = allQuestions[currentIndex];
  const currentSection   = sections.find(s => s.id === currentQuestion?.sectionId);
  const currentAnswer    = answers[currentQuestion?.id];
  const sectionIdx       = sections.findIndex(s => s.id === currentQuestion?.sectionId);
  const overallProgress  = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  // Per-section progress
  const sectionQuestions     = (currentSection?.questions || []).filter(Boolean);
  const questionInSection    = sectionQuestions.findIndex(q => q.id === currentQuestion?.id);
  const sectionProgress      = sectionQuestions.length > 0
    ? ((questionInSection + 1) / sectionQuestions.length) * 100
    : 0;

  const handleAnswerChange = useCallback((value) => {
    const qId = allQuestions[currentIndex]?.id;
    if (!qId) return;
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }, [currentIndex, allQuestions]);

  // Auto-save on answer change
  useEffect(() => {
    const qId = allQuestions[currentIndex]?.id;
    const answer = answers[qId];
    if (answer === undefined || answer === '' || answer === null) return;
    let cancelled = false;
    async function save() {
      setSaving(true);
      try {
        await saveAnswer(userId, sessionId, qId, answer);
        if (!cancelled) {
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 2000);
        }
      } catch {}
      if (!cancelled) setSaving(false);
    }
    save();
    return () => { cancelled = true; };
  }, [answers]);

  function isLastInSection(idx) {
    const q = allQuestions[idx];
    if (!q) return false;
    const next = allQuestions[idx + 1];
    return !next || next.sectionId !== q.sectionId;
  }

  function handleNext() {
    if (!nextEnabled) return;
    const isLast = currentIndex === totalQuestions - 1;
    const lastInSection = isLastInSection(currentIndex);
    // Fire-and-forget — never block navigation on a Firestore write
    updateSessionProgress(userId, sessionId, { currentQuestion: currentIndex + 1 }).catch(() => {});
    if (isLast) {
      console.log('[Submit] saving completed session', { userId, sessionId });
      completeSessionImmediate(userId, sessionId)
        .then(() => console.log('[Submit] session save success'))
        .catch(err => console.error('[Submit] session save failed:', err));
      navigate(`/results/${userId}/${sessionId}`);
      return;
    }
    if (lastInSection) {
      const nextSec = sections[sectionIdx + 1];
      setPauseNextSection(nextSec || null);
      setShowPause(true);
      return;
    }
    setCurrentIndex(prev => prev + 1);
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  }

  // multi_select stores an array — treat empty array as no answer
  const hasAnswer = Array.isArray(currentAnswer)
    ? currentAnswer.length > 0
    : currentAnswer !== undefined && currentAnswer !== '' && currentAnswer !== null;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#050505', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontSize: 14,
      }}>
        Loading your assessment…
      </div>
    );
  }

  // Section intro screen — shown at start of each section
  if (showSectionIntro && currentSection) {
    const subsections = [...new Set(
      sectionQuestions.map(q => q.subsection).filter(Boolean)
    )];
    return (
      <SectionIntroScreen
        cfg={cfg}
        section={currentSection}
        sectionNumber={sectionIdx + 1}
        totalSections={sections.length}
        subsections={subsections}
        questionCount={sectionQuestions.length}
        overallProgress={overallProgress}
        onBegin={() => setShowSectionIntro(false)}
      />
    );
  }

  // Section transition screen — shown after last question in a section
  if (showPause) {
    return (
      <SectionTransition
        cfg={cfg}
        completedSection={currentSection}
        nextSection={pauseNextSection}
        completedNumber={sectionIdx + 1}
        totalSections={sections.length}
        overallProgress={overallProgress}
        onContinue={() => {
          setShowPause(false);
          setCurrentIndex(prev => prev + 1);
          setShowSectionIntro(true);
        }}
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080A',
      color: '#F5F5F5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    }}>

      {/* ── Fixed Header ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(8,8,10,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Section progress bar */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)' }}>
          <div style={{
            height: '100%',
            width: `${sectionProgress}%`,
            background: cfg.accent,
            boxShadow: `0 0 10px ${cfg.accent}`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {/* Left: section + subsection */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                background: cfg.accentFaint,
                border: `1px solid ${cfg.accentBorder}`,
                color: cfg.accent,
                fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
                textTransform: 'uppercase', borderRadius: 6, padding: '2px 8px',
                whiteSpace: 'nowrap',
              }}>
                Section {sectionIdx + 1} of {sections.length}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentSection?.title}
              </span>
            </div>
            <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
              {currentQuestion?.subsection && (
                <span style={{ color: cfg.accent, fontSize: 12, fontWeight: 600 }}>
                  {currentQuestion.subsection}
                </span>
              )}
              {currentQuestion?.subsection && (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>·</span>
              )}
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
                Q {questionInSection + 1} of {sectionQuestions.length} in this section
              </span>
            </div>
          </div>
          {/* Right: save status + overall % */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {saving && <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>saving…</span>}
            {justSaved && !saving && <span style={{ color: cfg.accent, fontSize: 12 }}>✓ saved</span>}
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: cfg.accent, fontSize: 13, fontWeight: 800 }}>{Math.round(sectionProgress)}%</div>
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 10 }}>Overall {Math.round(overallProgress)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ paddingTop: 90, paddingBottom: 100, padding: '90px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.45fr) minmax(0,0.55fr)',
            gap: 24,
            alignItems: 'start',
          }}>

            {/* LEFT — Question */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 22,
              padding: 32,
            }}>
              {/* Subsection label */}
              {currentQuestion?.subsection && (
                <div style={{
                  display: 'inline-block',
                  background: cfg.accentFaint,
                  border: `1px solid ${cfg.accentBorder}`,
                  color: cfg.accent,
                  fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', borderRadius: 8,
                  padding: '4px 12px', marginBottom: 16,
                }}>
                  {currentQuestion.subsection}
                </div>
              )}

              <h2 style={{ fontSize: 28, lineHeight: 1.3, margin: '0 0 28px', fontWeight: 800, color: '#F5F5F5' }}>
                {currentQuestion?.text}
              </h2>

              <QuestionInput
                question={currentQuestion}
                value={currentAnswer}
                onChange={handleAnswerChange}
                accent={cfg.accent}
                accentFaint={cfg.accentFaint}
                accentBorder={cfg.accentBorder}
              />

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <button
                  onClick={handleBack}
                  disabled={currentIndex === 0}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: currentIndex === 0 ? 'rgba(255,255,255,0.2)' : '#EAEAEA',
                    fontWeight: 600, borderRadius: 14, padding: '13px 20px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', fontSize: 14,
                  }}
                >
                  ← Back
                </button>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: '#EAEAEA', fontWeight: 600, borderRadius: 14,
                      padding: '13px 18px', border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer', fontSize: 14,
                    }}
                  >
                    Save & Exit
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!nextEnabled || !hasAnswer}
                    style={{
                      background: !nextEnabled || !hasAnswer ? `${cfg.accent}30` : cfg.accent,
                      color: !nextEnabled || !hasAnswer ? cfg.accent : '#03131A',
                      fontWeight: 700, borderRadius: 14, padding: '13px 24px',
                      border: 'none', cursor: !nextEnabled || !hasAnswer ? 'not-allowed' : 'pointer',
                      fontSize: 15, opacity: !nextEnabled || !hasAnswer ? 0.6 : 1,
                    }}
                  >
                    {currentIndex === totalQuestions - 1 ? 'See My Results →' : isLastInSection(currentIndex) ? 'Complete Section →' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — Support Panel */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 22, padding: 22,
              display: 'grid', gap: 16, alignContent: 'start',
              position: 'sticky', top: 90,
            }}>
              <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                Your Guide
              </div>
              <div style={{
                borderRadius: 18, overflow: 'hidden',
                background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 40%)`,
                border: `1px solid ${cfg.accentBorder}`,
                height: 160,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={cfg.avatarImg}
                  alt={cfg.avatarName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              <div style={{
                padding: 14, borderRadius: 14,
                background: 'rgba(255,255,255,0.04)',
                color: '#EDEDED', lineHeight: 1.65,
                fontSize: 14, fontStyle: 'italic',
                transition: 'opacity 0.35s ease',
                opacity: msgVisible ? 1 : 0,
              }}>
                "{cfg.supportMessages[msgIndex]}"
              </div>
              {/* Section mini-map */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                  Assessment Progress
                </div>
                <div style={{ display: 'grid', gap: 4 }}>
                  {sections.map((sec, i) => {
                    const isActive = i === sectionIdx;
                    const isPast = i < sectionIdx;
                    return (
                      <div key={sec.id} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        opacity: isActive ? 1 : isPast ? 0.5 : 0.25,
                      }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                          background: isActive ? cfg.accent : isPast ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
                        }} />
                        <span style={{
                          fontSize: 11,
                          color: isActive ? cfg.accent : '#9CA3AF',
                          fontWeight: isActive ? 700 : 400,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {sec.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Save & Exit Modal ── */}
      {showSaveModal && (
        <SaveModal
          cfg={cfg}
          onKeepGoing={() => setShowSaveModal(false)}
          onDashboard={() => navigate(`/welcome/${userId}`)}
        />
      )}
    </div>
  );
}

// ─── Section Intro Screen — shown at start of each section ───────────────────
function SectionIntroScreen({ cfg, section, sectionNumber, totalSections, subsections, questionCount, overallProgress, onBegin }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 30%), #08080A`,
      color: '#F5F5F5',
      fontFamily: 'Inter, sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }}>
      <div style={{ maxWidth: 680, width: '100%' }}>
        {/* Overall progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Overall Progress</span>
            <span style={{ color: cfg.accent, fontSize: 12, fontWeight: 700 }}>{Math.round(overallProgress)}%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
            <div style={{ width: `${overallProgress}%`, height: '100%', background: cfg.accent, borderRadius: 999, transition: 'width 0.5s ease' }} />
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${cfg.accentBorder}`,
          borderRadius: 24, padding: '40px 36px',
        }}>
          {/* Section badge */}
          <div style={{
            display: 'inline-block',
            background: cfg.accentFaint,
            border: `1px solid ${cfg.accentBorder}`,
            color: cfg.accent,
            fontSize: 11, fontWeight: 800, letterSpacing: 1.4,
            textTransform: 'uppercase', borderRadius: 999,
            padding: '6px 16px', marginBottom: 20,
          }}>
            Section {sectionNumber} of {totalSections}
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.15 }}>
            {section.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, margin: '0 0 28px' }}>
            {questionCount} questions in this section
          </p>

          {/* Subsections */}
          {subsections.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
                Topics covered
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {subsections.map(sub => (
                  <span key={sub} style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#D1D5DB',
                    fontSize: 13, borderRadius: 8, padding: '5px 12px',
                  }}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onBegin}
            style={{
              width: '100%', padding: '16px 24px',
              background: cfg.accent, color: '#03131A',
              fontWeight: 700, fontSize: 16, border: 'none',
              borderRadius: 14, cursor: 'pointer',
            }}
          >
            Begin Section {sectionNumber} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section Transition Screen — shown after completing a section ─────────────
function SectionTransition({ cfg, completedSection, nextSection, completedNumber, totalSections, overallProgress, onContinue }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 26%), #08080A`,
      color: '#F5F5F5',
      fontFamily: 'Inter, sans-serif',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }}>
      <div style={{ maxWidth: 680, width: '100%' }}>
        {/* Overall progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Overall Progress</span>
            <span style={{ color: cfg.accent, fontSize: 12, fontWeight: 700 }}>{Math.round(overallProgress)}%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }}>
            <div style={{ width: `${overallProgress}%`, height: '100%', background: cfg.accent, borderRadius: 999 }} />
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${cfg.accentBorder}`,
          borderRadius: 24, padding: '40px 36px', textAlign: 'center',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: cfg.accentFaint, border: `2px solid ${cfg.accentBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, margin: '0 auto 20px',
          }}>
            ✓
          </div>

          <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>
            Section {completedNumber} of {totalSections} Complete
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>
            {completedSection?.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, margin: '0 0 28px' }}>
            Well done. Take a breath before continuing.
          </p>

          {nextSection && (
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '16px 20px',
              marginBottom: 28, textAlign: 'left',
            }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                Up next — Section {completedNumber + 1}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F5F5F5' }}>
                {nextSection.title}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                {nextSection.questions?.length} questions
              </div>
            </div>
          )}

          <button
            onClick={onContinue}
            disabled={!ready}
            style={{
              width: '100%', padding: '15px 24px',
              background: ready ? cfg.accent : 'rgba(255,255,255,0.08)',
              color: ready ? '#03131A' : 'rgba(255,255,255,0.4)',
              fontWeight: 700, fontSize: 16, border: 'none',
              borderRadius: 14, cursor: ready ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
            }}
          >
            {ready ? `Continue to Section ${completedNumber + 1} →` : 'One moment…'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Question Input — handles all question types ──────────────────────────────
function QuestionInput({ question, value, onChange, accent, accentFaint, accentBorder }) {
  if (!question) return null;
  const type = question.type;

  if (type === 'text' || type === 'open') {
    return (
      <textarea
        placeholder="Take your time. Write what's actually true for you…"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        rows={5}
        style={{
          width: '100%', boxSizing: 'border-box',
          borderRadius: 16, border: `1px solid ${value ? accent + '50' : 'rgba(255,255,255,0.1)'}`,
          background: 'rgba(255,255,255,0.04)', color: '#F5F5F5',
          padding: '16px 18px', outline: 'none', fontSize: 16,
          lineHeight: 1.7, resize: 'vertical', minHeight: 150,
          fontFamily: 'Inter, sans-serif',
        }}
      />
    );
  }

  if (type === 'slider') {
    const min = question.min || 1;
    const max = question.max || 10;
    const current = value ?? Math.round((min + max) / 2);
    const pct = ((current - min) / (max - min)) * 100;
    const labels = {
      1: 'Not at all', 2: 'Barely', 3: 'A little', 4: 'Somewhat',
      5: 'In the middle', 6: 'Mostly', 7: 'Pretty well', 8: 'Very much',
      9: 'Almost fully', 10: 'Completely',
    };
    return (
      <div style={{ display: 'grid', gap: 20 }}>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: accent, lineHeight: 1 }}>{current}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginTop: 6 }}>{labels[current] || ''}</div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: accent, transition: 'width 0.15s' }} />
          </div>
          <input
            type="range" min={min} max={max} value={current}
            onChange={e => onChange(Number(e.target.value))}
            style={{ position: 'absolute', top: -4, left: 0, width: '100%', opacity: 0, height: 16, cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 8 }}>
            <span>{question.minLabel || min}</span>
            <span>{question.maxLabel || max}</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'yes_no') {
    return (
      <div style={{ display: 'flex', gap: 14 }}>
        {['Yes', 'No'].map(opt => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                flex: 1, padding: '20px 16px', borderRadius: 16, fontSize: 18, fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.15s',
                background: selected ? `${accent}18` : 'rgba(255,255,255,0.03)',
                border: `2px solid ${selected ? accent : 'rgba(255,255,255,0.1)'}`,
                color: selected ? accent : 'rgba(255,255,255,0.6)',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  if (type === 'multi_select') {
    const options = question.options || [];
    const selected = Array.isArray(value) ? value : [];
    function toggle(opt) {
      selected.includes(opt) ? onChange(selected.filter(v => v !== opt)) : onChange([...selected, opt]);
    }
    return (
      <div style={{ display: 'grid', gap: 10 }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: '0 0 6px' }}>Select all that apply</p>
        {options.map((opt, i) => {
          const label = typeof opt === 'object' && opt !== null ? opt.label : opt;
          const isSelected = selected.includes(opt);
          return (
            <button key={i} onClick={() => toggle(opt)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '15px 18px', borderRadius: 16, textAlign: 'left',
              background: isSelected ? `${accent}15` : 'rgba(255,255,255,0.025)',
              border: `1.5px solid ${isSelected ? accent + '70' : 'rgba(255,255,255,0.09)'}`,
              color: isSelected ? '#F5F5F5' : 'rgba(255,255,255,0.65)',
              fontSize: 16, cursor: 'pointer', transition: 'all 0.15s ease',
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                border: `2px solid ${isSelected ? accent : 'rgba(255,255,255,0.2)'}`,
                background: isSelected ? accent : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isSelected && <span style={{ color: '#03131A', fontSize: 13, fontWeight: 900 }}>✓</span>}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Single-select: multiple, likert, forced_choice, scenario w/ options
  if (type === 'multiple' || type === 'likert' || type === 'forced_choice' ||
      (type === 'scenario' && question.options)) {
    const options = question.options || [];
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        {options.map((opt, i) => {
          const label = typeof opt === 'object' && opt !== null ? opt.label : opt;
          const selected = value === i;
          return (
            <button key={i} onClick={() => onChange(i)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 18px', borderRadius: 16, textAlign: 'left',
              background: selected ? `${accent}15` : 'rgba(255,255,255,0.025)',
              border: `1.5px solid ${selected ? accent + '70' : 'rgba(255,255,255,0.09)'}`,
              color: selected ? '#F5F5F5' : 'rgba(255,255,255,0.65)',
              fontSize: 16, cursor: 'pointer',
              transform: selected ? 'translateX(4px)' : 'none',
              transition: 'all 0.15s ease',
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${selected ? accent : 'rgba(255,255,255,0.2)'}`,
                background: selected ? `${accent}25` : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Fallback — text input
  return (
    <textarea
      placeholder="Describe what you would do…"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      rows={5}
      style={{
        width: '100%', boxSizing: 'border-box',
        borderRadius: 16, border: `1px solid ${value ? accent + '50' : 'rgba(255,255,255,0.1)'}`,
        background: 'rgba(255,255,255,0.04)', color: '#F5F5F5',
        padding: '16px 18px', outline: 'none', fontSize: 16,
        lineHeight: 1.7, resize: 'vertical', minHeight: 150,
        fontFamily: 'Inter, sans-serif',
      }}
    />
  );
}

// ─── Save & Exit Modal ────────────────────────────────────────────────────────
function SaveModal({ cfg, onKeepGoing, onDashboard }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        background: '#0E0E12', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, padding: 36, maxWidth: 480, width: '100%', textAlign: 'center',
      }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 900 }}>Progress Saved</h2>
        <p style={{ color: '#C4C4C4', fontSize: 16, margin: '0 0 28px', lineHeight: 1.6 }}>
          Your answers are saved. You can come back anytime and pick up right where you left off.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button onClick={onDashboard} style={{
            background: 'rgba(255,255,255,0.05)', color: '#EAEAEA',
            fontWeight: 600, borderRadius: 14, padding: '14px 22px',
            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: 15,
          }}>
            Return to Home
          </button>
          <button onClick={onKeepGoing} style={{
            background: cfg.accent, color: '#03131A',
            fontWeight: 700, borderRadius: 14, padding: '14px 22px',
            border: 'none', cursor: 'pointer', fontSize: 15,
          }}>
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
}
