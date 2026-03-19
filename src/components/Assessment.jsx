import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { USER_SECTIONS, PAUSE_MESSAGES } from '../data/questions';
import { saveAnswer, updateSessionProgress, completeSession, getSession, getAllAnswers } from '../hooks/useFirestore';
import QuestionCard from './QuestionCard';
import PauseBreath from './PauseBreath';

const USER_ACCENT = {
  mekhi: { text: 'text-mekhi', bg: 'bg-mekhi', border: 'border-mekhi', class: 'user-mekhi', hex: '#06B6D4' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', border: 'border-melvin', class: 'user-melvin', hex: '#8B5CF6' },
};

export default function Assessment() {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENT[userId] || USER_ACCENT.mekhi;
  const sections = USER_SECTIONS[userId] || USER_SECTIONS.mekhi;

  // Flatten all questions with section info
  const allQuestions = sections.flatMap(section =>
    section.questions.map(q => ({ ...q, sectionId: section.id, sectionTitle: section.title }))
  );
  const totalQuestions = allQuestions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showPause, setShowPause] = useState(false);
  const [pauseMessage, setPauseMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextEnabled, setNextEnabled] = useState(false);
  const timerRef = useRef(null);

  // Restore progress on mount
  useEffect(() => {
    async function restore() {
      try {
        const [session, savedAnswers] = await Promise.all([
          getSession(userId, sessionId),
          getAllAnswers(userId, sessionId),
        ]);
        if (savedAnswers) setAnswers(savedAnswers);
        if (session?.currentQuestion) {
          const idx = Math.min(session.currentQuestion, totalQuestions - 1);
          setCurrentIndex(idx);
        }
      } catch {}
      setLoading(false);
    }
    restore();
  }, [userId, sessionId, totalQuestions]);

  const currentQuestion = allQuestions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const currentSection = sections.find(s => s.id === currentQuestion?.sectionId);

  // Calculate progress per section for smooth bar
  const sectionIdx = sections.findIndex(s => s.id === currentQuestion?.sectionId);
  const questionsBeforeCurrentSection = sections
    .slice(0, sectionIdx)
    .reduce((acc, s) => acc + s.questions.length, 0);
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  // Enforce 4-second minimum delay before Next
  useEffect(() => {
    setNextEnabled(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNextEnabled(true), 4000);
    return () => clearTimeout(timerRef.current);
  }, [currentIndex]);

  const handleAnswerChange = useCallback((value) => {
    const qId = allQuestions[currentIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }, [currentIndex, allQuestions]);

  const handleSaveAnswer = useCallback(async (questionId, value) => {
    setSaving(true);
    try {
      await saveAnswer(userId, sessionId, questionId, value);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } catch {}
    setSaving(false);
  }, [userId, sessionId]);

  useEffect(() => {
    const qId = allQuestions[currentIndex]?.id;
    const answer = answers[qId];
    if (answer !== undefined && answer !== '' && answer !== null) {
      handleSaveAnswer(qId, answer);
    }
  }, [answers]);

  function isLastQuestionInSection(idx) {
    const q = allQuestions[idx];
    if (!q) return false;
    const next = allQuestions[idx + 1];
    return !next || next.sectionId !== q.sectionId;
  }

  async function handleNext() {
    if (!nextEnabled) return;

    const lastInSection = isLastQuestionInSection(currentIndex);
    const isLastQuestion = currentIndex === totalQuestions - 1;

    // Save progress
    try {
      await updateSessionProgress(userId, sessionId, { currentQuestion: currentIndex + 1 });
    } catch {}

    if (isLastQuestion) {
      // Complete assessment
      navigate(`/results/${userId}/${sessionId}`);
      return;
    }

    if (lastInSection) {
      // Show pause screen between sections
      const msg = PAUSE_MESSAGES[Math.floor(Math.random() * PAUSE_MESSAGES.length)];
      setPauseMessage(msg);
      setShowPause(true);
      return;
    }

    setCurrentIndex(prev => prev + 1);
  }

  function handleContinueFromPause() {
    setShowPause(false);
    setCurrentIndex(prev => prev + 1);
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/40">Loading your assessment...</div>
      </div>
    );
  }

  if (showPause) {
    const nextSection = sections[sectionIdx + 1];
    return (
      <PauseBreath
        message={pauseMessage}
        nextSectionTitle={nextSection?.title}
        accent={accent}
        onContinue={handleContinueFromPause}
      />
    );
  }

  const hasAnswer = currentAnswer !== undefined && currentAnswer !== '' && currentAnswer !== null;

  return (
    <div className={`min-h-screen flex flex-col ${accent.class}`} style={{ backgroundColor: '#0E0C0A' }}>

      {/* ── Premium Progress Header ── */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Thin glow progress bar */}
        <div className="relative h-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <div
            className="absolute h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%`, backgroundColor: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }}
          />
        </div>

        <div
          className="px-4 py-3 flex items-center justify-between backdrop-blur-sm"
          style={{ backgroundColor: '#0E0C0Af5' }}
        >
          <div>
            <p
              className="font-bold mb-0.5"
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.08em', color: accent.hex, fontSize: 15 }}
            >
              {currentSection?.title}
            </p>
            <p className="text-white/25 text-xs">
              {currentIndex + 1} / {totalQuestions} questions
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Save status */}
            {saving && (
              <span className="text-white/30 text-xs font-mono animate-pulse">saving…</span>
            )}
            {justSaved && !saving && (
              <span className="text-xs flex items-center gap-1 animate-fade-in" style={{ color: accent.hex }}>
                <span>✓</span> saved
              </span>
            )}

            {/* Progress pill */}
            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: `${accent.hex}18`, color: accent.hex }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>

      {/* ── Question ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-36">
        <div className="w-full max-w-2xl">
          {/* Section + subsection label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-0.5 h-5 rounded-full" style={{ backgroundColor: accent.hex, opacity: 0.6 }} />
            <p
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: `${accent.hex}90`, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em', fontSize: 13 }}
            >
              {currentSection?.title}
              {currentQuestion?.subsection ? ` · Part ${currentQuestion.subsection}` : ''}
            </p>
          </div>

          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentAnswer}
            onChange={handleAnswerChange}
            accent={accent}
          />
        </div>
      </div>

      {/* ── Navigation ── */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 py-4 backdrop-blur-sm border-t"
        style={{ backgroundColor: '#0E0C0Af5', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="px-5 py-3 rounded-2xl text-white/40 hover:text-white/70 font-medium transition-colors text-sm"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!nextEnabled || !hasAnswer}
            className="flex-1 py-3 rounded-2xl font-bold text-base transition-all duration-200 disabled:opacity-35"
            style={{
              backgroundColor: !nextEnabled || !hasAnswer ? `${accent.hex}30` : accent.hex,
              color: !nextEnabled || !hasAnswer ? accent.hex : '#0E0C0A',
            }}
          >
            {!nextEnabled
              ? 'Take your time…'
              : currentIndex === totalQuestions - 1
              ? 'See My Results →'
              : 'Next Question →'
            }
          </button>
        </div>
        {!nextEnabled && (
          <p className="text-center text-white/20 text-xs mt-2 font-mono">
            Reflect for a moment before moving on
          </p>
        )}
      </div>
    </div>
  );
}
