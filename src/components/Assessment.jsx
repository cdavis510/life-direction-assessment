// ─── SCREEN 04 — Question Screen + Screen 06 — Save Progress Modal ───────────
//
// DYNAMIC QUESTION ENGINE
// ─────────────────────────────────────────────────────────────────────────────
// Questions are loaded from src/data/questions.js → USER_SECTIONS[userId]
// Each section has: { id, title, questions: [...] }
// Each question has: { id, type, text, options?, min?, max?, subsectionName? }
//
// Supported question types:
//   text          → free text textarea
//   open          → free text textarea (alias)
//   multiple      → single-select choice list (radio)
//   likert        → single-select 1-5 agreement scale (radio)
//   forced_choice → single-select, pick one (radio)
//   scenario      → single-select if options[], else textarea
//   slider        → numeric range (min/max configurable per question)
//   multi_select  → multi-select checkboxes (select all that apply)
//   yes_no        → two-button Yes/No shorthand
//
// Answers saved to: Firestore → users/{userId}/sessions/{sessionId}/answers
// Progress saved to: Firestore → users/{userId}/sessions/{sessionId}
// Restore on mount: pulls session.currentQuestion + all saved answers
//
// AI-READY: Questions can be injected from any source (static array, API, or
// Claude-generated). To add AI-adaptive questions, push to USER_SECTIONS or
// build a separate dynamic section loader.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_SECTIONS } from '../data/questions';
import { saveAnswer, updateSessionProgress, getSession, getAllAnswers } from '../hooks/useFirestore';

// ─── User config ──────────────────────────────────────────────────────────────
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
  const sections = USER_SECTIONS[userId] || USER_SECTIONS.mekhi;

  const allQuestions = sections.flatMap(section =>
    section.questions.map(q => ({ ...q, sectionId: section.id, sectionTitle: section.title }))
  );
  const totalQuestions = allQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [pauseNextSection, setPauseNextSection] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);
  const timerRef = useRef(null);
  const msgTimerRef = useRef(null);

  // Restore progress
  useEffect(() => {
    async function restore() {
      try {
        const [session, savedAnswers] = await Promise.all([
          getSession(userId, sessionId),
          getAllAnswers(userId, sessionId),
        ]);
        if (savedAnswers) setAnswers(savedAnswers);
        if (session?.currentQuestion) {
          setCurrentIndex(Math.min(session.currentQuestion, totalQuestions - 1));
        }
      } catch {}
      setLoading(false);
    }
    restore();
  }, [userId, sessionId, totalQuestions]);

  // 4-second minimum before Next
  useEffect(() => {
    setNextEnabled(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNextEnabled(true), 4000);
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

  const currentQuestion = allQuestions[currentIndex];
  const currentSection = sections.find(s => s.id === currentQuestion?.sectionId);
  const currentAnswer = answers[currentQuestion?.id];
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const sectionIdx = sections.findIndex(s => s.id === currentQuestion?.sectionId);

  const handleAnswerChange = useCallback((value) => {
    const qId = allQuestions[currentIndex].id;
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

  async function handleNext() {
    if (!nextEnabled) return;
    const isLast = currentIndex === totalQuestions - 1;
    const lastInSection = isLastInSection(currentIndex);
    try {
      await updateSessionProgress(userId, sessionId, { currentQuestion: currentIndex + 1 });
    } catch {}
    if (isLast) {
      navigate(`/results/${userId}/${sessionId}`);
      return;
    }
    if (lastInSection) {
      const nextSection = sections[sectionIdx + 1];
      setPauseNextSection(nextSection?.title || '');
      setShowPause(true);
      return;
    }
    setCurrentIndex(prev => prev + 1);
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  }

  function handleSaveExit() {
    setShowSaveModal(true);
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

  if (showPause) {
    return (
      <SectionTransition
        cfg={cfg}
        nextSectionTitle={pauseNextSection}
        onContinue={() => { setShowPause(false); setCurrentIndex(prev => prev + 1); }}
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
        {/* Progress bar */}
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: cfg.accent,
            boxShadow: `0 0 10px ${cfg.accent}`,
            transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: cfg.accent, fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
              {currentSection?.title}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 2 }}>
              Question {currentIndex + 1} of {totalQuestions}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {saving && <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>saving…</span>}
            {justSaved && !saving && <span style={{ color: cfg.accent, fontSize: 12 }}>✓ saved</span>}
            <div style={{
              padding: '5px 12px', borderRadius: 999,
              background: cfg.accentFaint,
              border: `1px solid ${cfg.accentBorder}`,
              color: cfg.accent, fontSize: 12, fontWeight: 800,
            }}>
              {Math.round(progress)}%
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
              <h2 style={{ fontSize: 32, lineHeight: 1.25, margin: '0 0 10px', fontWeight: 800, color: '#F5F5F5' }}>
                {currentQuestion?.text}
              </h2>
              {currentQuestion?.subsectionName && (
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, margin: '0 0 28px' }}>
                  {currentQuestion.subsectionName}
                </p>
              )}

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
                    onClick={handleSaveExit}
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
                    {!nextEnabled ? 'Take your time…' : currentIndex === totalQuestions - 1 ? 'See My Results →' : 'Next →'}
                  </button>
                </div>
              </div>
              {!nextEnabled && (
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, textAlign: 'center', marginTop: 10 }}>
                  Reflect for a moment before moving on
                </p>
              )}
            </div>

            {/* RIGHT — Support Panel */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 22,
              padding: 22,
              display: 'grid',
              gap: 16,
              alignContent: 'start',
              position: 'sticky',
              top: 90,
            }}>
              <div style={{ fontSize: 11, color: cfg.accent, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                Support Panel
              </div>

              {/* Avatar portrait */}
              <div style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: `radial-gradient(circle at top, ${cfg.accentGlow}, transparent 40%)`,
                border: `1px solid ${cfg.accentBorder}`,
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={cfg.avatarImg}
                  alt={cfg.avatarName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = `radial-gradient(circle, ${cfg.accentGlow}, transparent)`;
                  }}
                />
              </div>

              {/* Rotating message */}
              <div style={{
                padding: 16,
                borderRadius: 16,
                background: 'rgba(255,255,255,0.04)',
                color: '#EDEDED',
                lineHeight: 1.65,
                fontSize: 15,
                fontStyle: 'italic',
                minHeight: 64,
                transition: 'opacity 0.35s ease',
                opacity: msgVisible ? 1 : 0,
              }}>
                "{cfg.supportMessages[msgIndex]}"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Save & Exit Modal (Screen 06) ── */}
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

// ─── Question Input — handles all question types ──────────────────────────────
function QuestionInput({ question, value, onChange, accent, accentFaint, accentBorder }) {
  if (!question) return null;
  const type = question.type;

  // ── Text / open answer ────────────────────────────────────────────────────
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

  // ── Slider (scale) ────────────────────────────────────────────────────────
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

  // ── Yes / No ──────────────────────────────────────────────────────────────
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
                boxShadow: selected ? `0 0 24px ${accent}20` : 'none',
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    );
  }

  // ── Multi-select — select all that apply ─────────────────────────────────
  if (type === 'multi_select') {
    const options = question.options || [];
    const selected = Array.isArray(value) ? value : [];
    function toggle(opt) {
      if (selected.includes(opt)) {
        onChange(selected.filter(v => v !== opt));
      } else {
        onChange([...selected, opt]);
      }
    }
    return (
      <div style={{ display: 'grid', gap: 10 }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: '0 0 6px' }}>Select all that apply</p>
        {options.map((opt, i) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={i}
              onClick={() => toggle(opt)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '15px 18px', borderRadius: 16, textAlign: 'left',
                background: isSelected ? `${accent}15` : 'rgba(255,255,255,0.025)',
                border: `1.5px solid ${isSelected ? accent + '70' : 'rgba(255,255,255,0.09)'}`,
                color: isSelected ? '#F5F5F5' : 'rgba(255,255,255,0.65)',
                fontSize: 16, cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? `0 0 20px ${accent}15` : 'none',
              }}
            >
              {/* Checkbox indicator */}
              <span style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                border: `2px solid ${isSelected ? accent : 'rgba(255,255,255,0.2)'}`,
                background: isSelected ? accent : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isSelected && <span style={{ color: '#03131A', fontSize: 13, fontWeight: 900, lineHeight: 1 }}>✓</span>}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // ── Single-select: multiple, likert, forced_choice, scenario w/ options ──
  if (type === 'multiple' || type === 'likert' || type === 'forced_choice' ||
      (type === 'scenario' && question.options)) {
    const options = question.options || [];
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        {options.map((opt, i) => {
          // opt can be a plain string (shared sections) or {label, points} object (mk_*/mv_* sections)
          const label = typeof opt === 'object' && opt !== null ? opt.label : opt;
          // Store by index; handles both object and string option formats for scoring
          const selected = value === i;
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px', borderRadius: 16, textAlign: 'left',
                background: selected ? `${accent}15` : 'rgba(255,255,255,0.025)',
                border: `1.5px solid ${selected ? accent + '70' : 'rgba(255,255,255,0.09)'}`,
                color: selected ? '#F5F5F5' : 'rgba(255,255,255,0.65)',
                fontSize: 16, cursor: 'pointer',
                transform: selected ? 'translateX(4px)' : 'none',
                transition: 'all 0.15s ease',
                boxShadow: selected ? `0 0 20px ${accent}15` : 'none',
              }}
            >
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

  // ── Scenario / fallback — text input ─────────────────────────────────────
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

// ─── Screen 05 — Section Transition ──────────────────────────────────────────
function SectionTransition({ cfg, nextSectionTitle, onContinue }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 5000);
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
      <div style={{ maxWidth: 860, width: '100%' }}>
        <div style={{
          textAlign: 'center',
          padding: 40,
          borderRadius: 24,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ color: cfg.accent, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.4 }}>
            Section Complete
          </div>
          <h2 style={{ fontSize: 38, margin: '16px 0 10px', fontWeight: 900 }}>
            You're making progress.
          </h2>
          {nextSectionTitle && (
            <p style={{ color: '#C9C9C9', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
              Next section: {nextSectionTitle}
            </p>
          )}

          {/* Avatar message */}
          <div style={{
            margin: '28px auto 0',
            maxWidth: 360,
            padding: '16px 20px',
            borderRadius: 16,
            background: cfg.accentFaint,
            border: `1px solid ${cfg.accentBorder}`,
            color: '#EAFBFF',
            fontSize: 16,
            fontStyle: 'italic',
          }}>
            "Stay focused."
          </div>

          <div style={{ marginTop: 28 }}>
            <button
              onClick={onContinue}
              disabled={!ready}
              style={{
                background: ready ? cfg.accent : 'rgba(255,255,255,0.08)',
                color: ready ? '#03131A' : 'rgba(255,255,255,0.4)',
                fontWeight: 700, borderRadius: 14,
                padding: '15px 36px', border: 'none',
                cursor: ready ? 'pointer' : 'not-allowed',
                fontSize: 16, transition: 'all 0.3s',
              }}
            >
              {ready ? 'Continue' : 'One moment…'}
            </button>
          </div>
          {!ready && (
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 12 }}>
              Take a breath before the next section
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 06 — Save Progress Modal ─────────────────────────────────────────
function SaveModal({ cfg, onKeepGoing, onDashboard }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: '#0E0E12',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        borderRadius: 24,
        padding: 36,
        maxWidth: 520,
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: cfg.accentFaint,
          border: `1px solid ${cfg.accentBorder}`,
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          ✓
        </div>
        <h2 style={{ margin: '0 0 12px', fontSize: 32, fontWeight: 900 }}>Progress Saved</h2>
        <p style={{ color: '#C4C4C4', fontSize: 17, margin: '0 0 28px', lineHeight: 1.6 }}>
          Your answers are saved. You can come back anytime and pick up right where you left off.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={onDashboard}
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#EAEAEA', fontWeight: 600, borderRadius: 14,
              padding: '14px 22px', border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', fontSize: 15,
            }}
          >
            Return to Home
          </button>
          <button
            onClick={onKeepGoing}
            style={{
              background: cfg.accent,
              color: '#03131A', fontWeight: 700, borderRadius: 14,
              padding: '14px 22px', border: 'none',
              cursor: 'pointer', fontSize: 15,
            }}
          >
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
}
