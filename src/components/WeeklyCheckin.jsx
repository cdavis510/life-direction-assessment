// ─── WEEKLY CHECK-IN ──────────────────────────────────────────────────────────
// Sunday at 7pm · 5–10 minutes
// 1 Personal Skill Building + 1 Communication Skill Building
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const USER_ACCENT = {
  mekhi:  { text: 'text-mekhi',  bg: 'bg-mekhi',  hex: '#06B6D4', class: 'user-mekhi',  name: 'Mekhi' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', hex: '#8B5CF6', class: 'user-melvin', name: 'Melvin' },
};

// ─── Question Banks ──────────────────────────────────────────────────────────

const PERSONAL_SKILL_BANKS = {
  mekhi: [
    {
      id: 'ps_m_1',
      skill: 'Time Awareness',
      question: 'Think about how you used your time this week. What was one hour you spent well — and one hour you wasted? What does that tell you?',
      type: 'text',
    },
    {
      id: 'ps_m_2',
      skill: 'Self-Discipline',
      question: 'Rate your discipline this week from 1–10. What did you do consistently? What did you skip?',
      type: 'slider',
    },
    {
      id: 'ps_m_3',
      skill: 'Decision Making',
      question: 'Name one decision you made this week that you are proud of. What made it the right call?',
      type: 'text',
    },
    {
      id: 'ps_m_4',
      skill: 'Focus & Follow-Through',
      question: 'Did you start something this week that you did not finish? If yes — what stopped you?',
      type: 'text',
    },
    {
      id: 'ps_m_5',
      skill: 'Emotional Regulation',
      question: 'Did anything frustrate or stress you out this week? How did you handle it — honestly?',
      type: 'text',
    },
    {
      id: 'ps_m_6',
      skill: 'Responsibility',
      question: 'What is one thing that was your responsibility this week that you either owned or avoided?',
      type: 'text',
    },
  ],
  melvin: [
    {
      id: 'ps_e_1',
      skill: 'Academic Consistency',
      question: 'Did you show up to every class this week? Rate your academic consistency 1–10.',
      type: 'slider',
    },
    {
      id: 'ps_e_2',
      skill: 'Goal Clarity',
      question: 'What is one thing you did this week that directly moves you toward Morehouse or your career in sports finance?',
      type: 'text',
    },
    {
      id: 'ps_e_3',
      skill: 'Self-Management',
      question: 'How was your sleep and energy this week? What would you change?',
      type: 'text',
    },
    {
      id: 'ps_e_4',
      skill: 'Preparation',
      question: 'Are you prepared for what is coming next week — academically and personally? What needs attention?',
      type: 'text',
    },
    {
      id: 'ps_e_5',
      skill: 'Mindset',
      question: 'Rate your overall mindset this week from 1–10. What was driving it?',
      type: 'slider',
    },
  ],
};

const COMMUNICATION_SKILL_BANKS = {
  mekhi: [
    {
      id: 'cs_m_1',
      skill: 'Listening',
      question: 'Did someone try to tell you something important this week that you may not have fully heard? What were they really saying?',
      type: 'text',
    },
    {
      id: 'cs_m_2',
      skill: 'Asking for Help',
      question: 'Was there a moment this week where you needed help but did not ask? What held you back?',
      type: 'text',
    },
    {
      id: 'cs_m_3',
      skill: 'Expressing Yourself',
      question: 'Is there something you have been wanting to say to someone — your mom, a friend, a professor — that you have kept inside? What is it?',
      type: 'text',
    },
    {
      id: 'cs_m_4',
      skill: 'Conflict Resolution',
      question: 'Was there any tension or conflict this week? How did you handle it — or avoid it?',
      type: 'text',
    },
    {
      id: 'cs_m_5',
      skill: 'Connection',
      question: 'Rate how connected you felt to the people around you this week. Who did you actually talk to?',
      type: 'slider',
    },
  ],
  melvin: [
    {
      id: 'cs_e_1',
      skill: 'Assertiveness',
      question: 'Was there a moment this week where you held your ground or stood up for what you believed? Describe it.',
      type: 'text',
    },
    {
      id: 'cs_e_2',
      skill: 'Listening',
      question: 'Who did you actually listen to this week — not just hear, but really listen to? What did you learn?',
      type: 'text',
    },
    {
      id: 'cs_e_3',
      skill: 'Expressing Needs',
      question: 'Is there something you need from your mom, your school, or your circle that you have not said out loud? What is it?',
      type: 'text',
    },
    {
      id: 'cs_e_4',
      skill: 'Team & Collaboration',
      question: 'How are your relationships at school or home right now? What would make them stronger?',
      type: 'text',
    },
    {
      id: 'cs_e_5',
      skill: 'Confidence in Communication',
      question: 'Rate your communication confidence this week 1–10. Where did you feel strong? Where did you hold back?',
      type: 'slider',
    },
  ],
};

function pickQuestion(bank, weekIndex) {
  return bank[weekIndex % bank.length];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function WeeklyQuestion({ question, value, onChange, accent, label }) {
  return (
    <div className="animate-fade-in">
      {/* Skill badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent.hex }} />
        <div>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: accent.hex }}>
            {label}
          </p>
          <p className="text-white/40 text-xs">{question.skill}</p>
        </div>
      </div>

      {/* Question */}
      <h2
        className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-8"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {question.question}
      </h2>

      {/* Input */}
      {question.type === 'text' && (
        <textarea
          className="w-full rounded-2xl px-5 py-4 text-white placeholder-white/25 text-sm leading-relaxed resize-none outline-none transition-all"
          style={{
            backgroundColor: '#1A1815',
            border: `1px solid ${value ? accent.hex + '50' : 'rgba(255,255,255,0.1)'}`,
            minHeight: 140,
          }}
          placeholder="Take your time. Write what's actually true for you..."
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={5}
        />
      )}

      {question.type === 'slider' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-7xl font-bold mb-1 transition-all duration-200"
              style={{ color: accent.hex }}>
              {value ?? 5}
            </div>
            <p className="text-white/40 text-sm">out of 10</p>
          </div>
          <input
            type="range" min={1} max={10}
            value={value ?? 5}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-white/30 text-xs">
            <span>1 — Struggling</span>
            <span>10 — Locked in</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WeeklyCheckin() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENT[userId] || USER_ACCENT.mekhi;

  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const personalQ = pickQuestion(PERSONAL_SKILL_BANKS[userId] || PERSONAL_SKILL_BANKS.mekhi, weekIndex);
  const commQ     = pickQuestion(COMMUNICATION_SKILL_BANKS[userId] || COMMUNICATION_SKILL_BANKS.mekhi, weekIndex + 1);

  const questions = [
    { ...personalQ,  label: 'Personal Skill Building' },
    { ...commQ,      label: 'Communication Skill Building' },
  ];

  const [step, setStep]       = useState(0); // 0=intro, 1=q1, 2=q2, 3=done
  const [answers, setAnswers] = useState({});
  const [saving, setSaving]   = useState(false);
  const [nextReady, setNextReady] = useState(false);

  useEffect(() => {
    setNextReady(false);
    const t = setTimeout(() => setNextReady(true), 3000);
    return () => clearTimeout(t);
  }, [step]);

  const currentQ   = questions[step - 1];
  const currentAns = currentQ ? answers[currentQ.id] : null;
  const hasAnswer  = currentAns !== undefined && currentAns !== '' && currentAns !== null;

  async function handleFinish() {
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', userId, 'weeklyCheckins'), {
        answers,
        week: weekIndex,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Weekly save error:', e);
    }
    setSaving(false);
    setStep(3);
  }

  // ── Intro screen ──
  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{ backgroundColor: '#0E0C0A' }}>
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: accent.hex + '20', border: `1px solid ${accent.hex}40` }}>
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: accent.hex }}>
            Weekly Check-In · Sundays 7pm
          </p>
          <h1 className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            {accent.name}'s Weekly
          </h1>
          <p className="text-white/40 text-sm mb-2">5–10 minutes · 2 questions</p>
          <div className="rounded-2xl p-5 mb-8 text-left space-y-3"
            style={{ backgroundColor: '#1A1815', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: accent.hex + '20' }}>
                <span className="text-xs" style={{ color: accent.hex }}>1</span>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Personal Skill Building</p>
                <p className="text-white/30 text-xs">{personalQ.skill}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: accent.hex + '20' }}>
                <span className="text-xs" style={{ color: accent.hex }}>2</span>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Communication Skill Building</p>
                <p className="text-white/30 text-xs">{commQ.skill}</p>
              </div>
            </div>
          </div>
          <button onClick={() => setStep(1)}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:scale-105"
            style={{ backgroundColor: accent.hex, color: '#0E0C0A' }}>
            Let's Go →
          </button>
          <button onClick={() => navigate('/')}
            className="mt-4 text-white/20 text-xs hover:text-white/50 transition-colors">
            ← Back to home
          </button>
        </div>
      </div>
    );
  }

  // ── Done screen ──
  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
        style={{ backgroundColor: '#0E0C0A' }}>
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="text-5xl mb-4" style={{ color: accent.hex }}>✓</div>
          <h2 className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
            Week Complete
          </h2>
          <p className="text-white/40 text-sm mb-8">
            Saved to your history and your mom's dashboard. See you next Sunday.
          </p>
          <div className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: '#1A1815', border: `1px solid ${accent.hex}20` }}>
            <p className="text-white/30 text-xs mb-3 uppercase tracking-widest font-mono">This week's skills</p>
            <div className="space-y-2">
              <p className="text-white/60 text-sm">✦ {personalQ.skill}</p>
              <p className="text-white/60 text-sm">✦ {commQ.skill}</p>
            </div>
          </div>
          <button onClick={() => navigate('/')}
            className="w-full py-4 rounded-2xl font-bold text-base transition-all"
            style={{ backgroundColor: accent.hex, color: '#0E0C0A' }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ── Question screens ──
  const isLastQ = step === 2;
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0E0C0A' }}>
      {/* Progress header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-0.5" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%`, backgroundColor: accent.hex }} />
        </div>
        <div className="px-4 py-3 flex items-center justify-between backdrop-blur-sm"
          style={{ backgroundColor: '#0E0C0Af0' }}>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: accent.hex }}>
              Weekly Check-In
            </p>
            <p className="text-white/30 text-xs">Question {step} of 2</p>
          </div>
          <button onClick={() => navigate('/')} className="text-white/25 text-xs hover:text-white/50 transition-colors">
            ✕ Exit
          </button>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-32">
        <div className="w-full max-w-xl">
          <WeeklyQuestion
            question={currentQ}
            value={currentAns}
            onChange={v => setAnswers(prev => ({ ...prev, [currentQ.id]: v }))}
            accent={accent}
            label={questions[step - 1].label}
          />
        </div>
      </div>

      {/* Nav */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 backdrop-blur-sm border-t"
        style={{ backgroundColor: '#0E0C0Af0', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-xl mx-auto flex gap-3">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="px-5 py-3 rounded-xl text-white/40 hover:text-white/70 text-sm transition-colors">
              ← Back
            </button>
          )}
          {!isLastQ ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!nextReady || !hasAnswer}
              className="flex-1 py-3 rounded-xl font-bold text-base transition-all disabled:opacity-40"
              style={{ backgroundColor: accent.hex, color: '#0E0C0A' }}>
              {nextReady ? 'Next →' : 'Take your time...'}
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!nextReady || !hasAnswer || saving}
              className="flex-1 py-3 rounded-xl font-bold text-base transition-all disabled:opacity-40"
              style={{ backgroundColor: accent.hex, color: '#0E0C0A' }}>
              {saving ? 'Saving...' : 'Submit ✓'}
            </button>
          )}
        </div>
        {!nextReady && (
          <p className="text-center text-white/20 text-xs mt-2">Reflect for a moment before moving on</p>
        )}
      </div>
    </div>
  );
}
