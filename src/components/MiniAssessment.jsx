import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MINI_ASSESSMENT } from '../data/questions';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import QuestionCard from './QuestionCard';
import { getSessionScores, getLatestCompletedSession } from '../hooks/useFirestore';
import { buildMonthlyManGoal } from '../engines/growthEngine';

const USER_ACCENT = {
  mekhi:  { text: 'text-mekhi',  bg: 'bg-mekhi',  class: 'user-mekhi',  name: 'Mekhi',  hex: '#06B6D4' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', class: 'user-melvin', name: 'Melvin', hex: '#8B5CF6' },
};

async function saveMiniAssessment(userId, answers) {
  const ref = collection(db, 'users', userId, 'miniAssessments');
  await addDoc(ref, { answers, createdAt: serverTimestamp(), month: new Date().toISOString().slice(0, 7) });
}

async function getLastMiniAssessment(userId) {
  const ref = collection(db, 'users', userId, 'miniAssessments');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(1));
  const snap = await getDocs(q);
  return snap.docs[0]?.data() || null;
}

export default function MiniAssessment() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENT[userId] || USER_ACCENT.mekhi;
  const questions = MINI_ASSESSMENT.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [lastMini, setLastMini] = useState(null);
  const [monthlyGoal, setMonthlyGoal] = useState(null);
  const [latestScores, setLatestScores] = useState(null);

  useEffect(() => {
    getLastMiniAssessment(userId).then(setLastMini).catch(e => console.warn('Could not load last mini:', e));
    getLatestCompletedSession(userId)
      .then(session => session?.id ? getSessionScores(userId, session.id) : null)
      .then(scores => {
        if (scores) {
          setLatestScores(scores);
          setMonthlyGoal(buildMonthlyManGoal(scores));
        }
      })
      .catch(e => console.warn('Could not load scores:', e));
  }, [userId]);

  useEffect(() => {
    setNextEnabled(false);
    const t = setTimeout(() => setNextEnabled(true), 3000);
    return () => clearTimeout(t);
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== '' && currentAnswer !== null;
  const isLast = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  }

  async function handleNext() {
    if (!nextEnabled || !hasAnswer) return;
    if (isLast) {
      setSaving(true);
      try {
        await saveMiniAssessment(userId, answers);
        setSubmitted(true);
      } catch (e) { console.error(e); }
      setSaving(false);
      return;
    }
    setCurrentIndex(p => p + 1);
  }

  if (submitted) {
    const alignmentAnswer = answers['mi_03'];
    const accentKey = userId === 'mekhi' ? 'mekhi' : 'melvin';
    return (
      <div className={`min-h-screen px-4 py-12 ${accent.class}`}>
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <div className={`text-5xl mb-4 ${accent.text} text-center`}>✓</div>
          <h2 className="text-2xl font-bold text-white mb-1 text-center">Monthly check-in saved.</h2>
          <p className="text-white/50 mb-6 text-sm text-center">
            Added to your history and your mom's dashboard.
          </p>

          {/* Alignment score */}
          {alignmentAnswer && (
            <div className="card mb-4" style={{ border: `1px solid ${accent.hex || '#06B6D4'}30` }}>
              <p className="text-white/50 text-xs mb-1">Your alignment this month</p>
              <div className="flex items-end gap-2">
                <p className={`text-4xl font-bold ${accent.text}`}>{alignmentAnswer}</p>
                <span className="text-white/30 text-xl mb-0.5">/10</span>
              </div>
              <p className="text-white/40 text-xs mt-1">
                {alignmentAnswer >= 8 ? 'Strong alignment — keep the momentum.' :
                 alignmentAnswer >= 6 ? 'Getting there — identify what\'s holding you back.' :
                 alignmentAnswer >= 4 ? 'Below where you want to be — something needs to change.' :
                 'Low alignment — this month needs a different approach.'}
              </p>
            </div>
          )}

          {/* Monthly Man Goal */}
          {monthlyGoal && (
            <div className="card border border-white/10 mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Your Focus This Month
              </p>
              <p className={`text-lg font-bold ${accent.text} mb-0.5`}>{monthlyGoal.title}</p>
              <p className="text-white/50 text-xs mb-3">{monthlyGoal.subtitle}</p>
              <p className="text-white/70 text-sm leading-relaxed mb-3">{monthlyGoal.description}</p>
              <div className="border-t border-white/10 pt-3 mt-3">
                <p className="text-xs text-white/40 mb-1">Weekly target</p>
                <p className="text-white/70 text-sm">{monthlyGoal.weeklyTarget}</p>
              </div>
              <div className="border-t border-white/10 pt-3 mt-3">
                <p className="text-xs text-white/40 mb-1">Monthly milestone</p>
                <p className="text-white/70 text-sm">{monthlyGoal.monthlyMilestone}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/')} className={`btn-primary ${accent.bg} text-navy font-bold`}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${accent.class}`}>
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-white/10">
          <div className={`h-full ${accent.bg} transition-all duration-500`} style={{ width: `${progress}%` }} />
        </div>
        <div className="bg-navy/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
          <div>
            <p className={`text-xs font-semibold ${accent.text} uppercase tracking-wider`}>Monthly Check-In</p>
            <p className="text-white/30 text-xs">{currentIndex + 1} of {questions.length}</p>
          </div>
          <button onClick={() => navigate('/')} className="text-white/30 text-xs hover:text-white/60">✕ Exit</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <div className="w-full max-w-xl">
          {lastMini && (
            <p className="text-white/30 text-xs mb-4">
              Last check-in: {new Date(lastMini.createdAt?.toDate?.() || lastMini.createdAt).toLocaleDateString()}
            </p>
          )}
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentAnswer}
            onChange={handleAnswer}
            accent={accent}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-sm border-t border-white/10 px-4 py-4">
        <div className="max-w-xl mx-auto flex gap-3">
          {currentIndex > 0 && (
            <button onClick={() => setCurrentIndex(p => p - 1)} className="px-5 py-3 rounded-xl text-white/50 hover:text-white/80 text-sm">
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!nextEnabled || !hasAnswer || saving}
            className={`btn-primary flex-1 ${accent.bg} text-navy font-bold`}
          >
            {saving ? 'Saving...' : isLast ? 'Submit ✓' : nextEnabled ? 'Next →' : 'Take your time...'}
          </button>
        </div>
      </div>
    </div>
  );
}
