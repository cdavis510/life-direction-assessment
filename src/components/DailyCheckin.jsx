import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DAILY_CHECKIN_QUESTIONS } from '../data/questions';
import { saveDailyCheckin, getRecentCheckins } from '../hooks/useFirestore';
import QuestionCard from './QuestionCard';

const USER_ACCENT = {
  mekhi: { text: 'text-mekhi', bg: 'bg-mekhi', class: 'user-mekhi', name: 'Mekhi' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', class: 'user-melvin', name: 'Melvin' },
};

export default function DailyCheckin() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENT[userId] || USER_ACCENT.mekhi;
  const questions = DAILY_CHECKIN_QUESTIONS[userId] || DAILY_CHECKIN_QUESTIONS.mekhi;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recentCheckins, setRecentCheckins] = useState([]);
  const [nextEnabled, setNextEnabled] = useState(false);

  useEffect(() => {
    getRecentCheckins(userId).then(setRecentCheckins).catch(() => {});
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

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  }

  async function handleNext() {
    if (!nextEnabled || !hasAnswer) return;
    if (isLast) {
      setSaving(true);
      try {
        await saveDailyCheckin(userId, answers);
        setSubmitted(true);
      } catch {}
      setSaving(false);
      return;
    }
    setCurrentIndex(prev => prev + 1);
  }

  if (submitted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${accent.class}`}>
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className={`text-5xl mb-4 ${accent.text}`}>✓</div>
          <h2 className="text-2xl font-bold mb-2 text-white">Check-in saved.</h2>
          <p className="text-white/60 mb-8">Your mom will see this in her dashboard.</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className={`btn-primary ${accent.bg} text-navy font-bold`}
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate(`/history/${userId}`)}
              className="btn-primary bg-white/10 text-white hover:bg-white/15"
            >
              View My History
            </button>
          </div>

          {/* Streak indicator */}
          {recentCheckins.length > 0 && (
            <div className={`mt-8 ${accent.text} text-sm`}>
              🔥 {recentCheckins.length + 1} day streak — keep it going
            </div>
          )}
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className={`min-h-screen flex flex-col ${accent.class}`}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-white/10">
          <div
            className={`h-full ${accent.bg} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="bg-navy/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
          <div>
            <p className={`text-xs font-semibold ${accent.text} uppercase tracking-wider`}>Daily Check-In</p>
            <p className="text-white/30 text-xs">{currentIndex + 1} of {questions.length}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-xs hover:text-white/60"
          >
            ✕ Exit
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <div className="w-full max-w-xl">
          <div className="section-label text-white/40 mb-4">How are you doing today?</div>
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            value={currentAnswer}
            onChange={handleAnswer}
            accent={accent}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-sm border-t border-white/10 px-4 py-4">
        <div className="max-w-xl mx-auto flex gap-3">
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(p => p - 1)}
              className="px-5 py-3 rounded-xl text-white/50 hover:text-white/80 text-sm"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!nextEnabled || !hasAnswer || saving}
            className={`btn-primary flex-1 ${accent.bg} text-navy font-bold`}
          >
            {saving
              ? 'Saving...'
              : isLast
              ? 'Submit Check-In ✓'
              : nextEnabled
              ? 'Next →'
              : 'Take your time...'
            }
          </button>
        </div>
      </div>
    </div>
  );
}
