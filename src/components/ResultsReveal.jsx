import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllAnswers, getAllSessions, completeSession, saveSessionScores } from '../hooks/useFirestore';
import { getMekhiAnalysis } from '../agents/mekhiAgent';
import { getMelvinAnalysis } from '../agents/melvinAgent';
import {
  buildResultsPackage,
  getScoreLabel,
} from '../engines/scoreEngine';
import { USER_SECTIONS } from '../data/questions';
import { CAREER_BLUEPRINTS } from '../data/careerBlueprintData';
import LifestyleVisionCard from './LifestyleVisionCard';

// ─── Accent config ─────────────────────────────────────────────────────────────
const USER_ACCENT = {
  mekhi: { text: 'text-mekhi', bg: 'bg-mekhi', class: 'user-mekhi', hex: '#06B6D4' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', class: 'user-melvin', hex: '#8B5CF6' },
};

const FOLLOWUP_QUESTIONS = [
  'What part of this feels accurate to you?',
  'What part do you disagree with?',
  'What surprised you the most?',
  'What is ONE thing you would want to improve first?',
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ResultsReveal() {
  const { userId, sessionId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENT[userId] || USER_ACCENT.mekhi;

  const [phase, setPhase] = useState('loading'); // loading | intro | generating | results | followup
  const [analysis, setAnalysis] = useState('');
  const [scores, setScores] = useState(null);
  const [followupAnswers, setFollowupAnswers] = useState({});
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

        // Compute scores immediately — synchronous
        let pkg = null;
        const sections = USER_SECTIONS[userId];
        if (sections) {
          try {
            pkg = buildResultsPackage(answers, sections);
            setScores(pkg);
            // Save to Firestore in background (non-blocking)
            saveSessionScores(userId, sessionId, pkg).catch(() => {});
          } catch {
            // scoring optional — don't block the flow
          }
        }

        setPhase('intro');

        // Start AI analysis in background with score context
        generateAnalysis(answers, prev, pkg);
      } catch (err) {
        setError('Something went wrong loading your results. Please try again.');
        setPhase('results');
      }
    }
    load();
  }, [userId, sessionId]);

  async function generateAnalysis(answers, prev, pkg) {
    try {
      const fn = userId === 'mekhi' ? getMekhiAnalysis : getMelvinAnalysis;
      const result = await fn(answers, prev, pkg);
      setAnalysis(result);
      await completeSession(userId, sessionId, result);
    } catch {
      setAnalysis('');
      setError('We encountered an issue generating your full analysis. Your answers have been saved. Please try again.');
    }
  }

  function handleReveal() {
    if (analysis) {
      setPhase('results');
    } else {
      setPhase('generating');
    }
  }

  useEffect(() => {
    if (phase === 'generating' && analysis) {
      setPhase('results');
    }
  }, [phase, analysis]);

  if (phase === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading your results...</p>
        </div>
      </div>
    );
  }

  if (phase === 'intro') {
    return <IntroScreen accent={accent} onReveal={handleReveal} userId={userId} />;
  }

  if (phase === 'generating') {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${accent.class}`}>
        <div className="text-center max-w-md">
          <div className={`w-16 h-16 rounded-full ${accent.bg} opacity-30 animate-ping mx-auto mb-6`} />
          <p className="text-white/70 text-lg mb-2">Building your blueprint...</p>
          <p className="text-white/40 text-sm">This takes a moment. Your answers are being analyzed deeply.</p>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <ResultsScreen
        accent={accent}
        analysis={analysis}
        scores={scores}
        error={error}
        userId={userId}
        sessionId={sessionId}
        previousSessions={previousSessions}
        followupAnswers={followupAnswers}
        setFollowupAnswers={setFollowupAnswers}
        onFollowup={() => setPhase('followup')}
        navigate={navigate}
      />
    );
  }

  if (phase === 'followup') {
    return (
      <FollowupScreen
        accent={accent}
        followupAnswers={followupAnswers}
        setFollowupAnswers={setFollowupAnswers}
        userId={userId}
        navigate={navigate}
      />
    );
  }

  return null;
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────
function IntroScreen({ accent, onReveal, userId }) {
  const [canReveal, setCanReveal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCanReveal(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${accent.class}`}>
      <div className="w-full max-w-xl text-center animate-fade-in">
        <div className={`text-5xl mb-6 font-bold ${accent.text}`}>✦</div>
        <h1 className="text-3xl font-bold mb-6 text-white">Your Future Blueprint — Results</h1>
        <div className="card border border-white/10 text-left space-y-4 text-white/80 leading-relaxed mb-8">
          <p>Take a moment before reading this.</p>
          <p>What you're about to see is not a judgment. It's a <strong className="text-white">reflection</strong> — based on your answers — of where you are right now and where you said you want to go.</p>
          <p>Nothing here is permanent. Nothing here defines you. This is simply a starting point.</p>
          <p className={`font-semibold text-lg ${accent.text}`}>You have vision. And that matters — because not everyone does.</p>
        </div>
        <button
          onClick={onReveal}
          disabled={!canReveal}
          className={`btn-primary ${accent.bg} text-navy font-bold px-10 py-4 text-base`}
        >
          {canReveal ? 'Show Me My Blueprint →' : 'Preparing your results...'}
        </button>
      </div>
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function ResultsScreen({ accent, analysis, scores, error, userId, sessionId, previousSessions, navigate, onFollowup }) {
  const name = userId === 'mekhi' ? 'Mekhi' : 'Melvin';

  return (
    <div className={`min-h-screen ${accent.class}`}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className={`section-label ${accent.text} mb-2`}>Your Blueprint</div>
          <h1 className="text-3xl font-bold text-white">{name}'s Future Blueprint</h1>
          {previousSessions.length > 0 && (
            <p className="text-white/40 text-sm mt-2">
              Assessment #{previousSessions.length + 1} — you can compare your growth over time
            </p>
          )}
        </div>

        {/* Score Dashboard — only shown when scores are computed */}
        {scores && <ScoreDashboard scores={scores} accent={accent} userId={userId} />}

        {/* AI Analysis */}
        <div className="card border border-white/10 mt-6">
          <p className={`font-semibold ${accent.text} mb-4 text-sm uppercase tracking-widest`}>
            Your Full Analysis
          </p>
          {error && !analysis && (
            <div className="bg-white/5 rounded-xl p-4 text-white/60 text-sm">{error}</div>
          )}
          {analysis ? (
            <div
              className="ai-result text-white/85"
              dangerouslySetInnerHTML={{ __html: formatAnalysis(analysis) }}
            />
          ) : (
            <div className="flex items-center gap-3 py-6">
              <div className={`w-4 h-4 rounded-full ${accent.bg} opacity-60 animate-pulse`} />
              <p className="text-white/40 text-sm">Analysis is being generated...</p>
            </div>
          )}
        </div>

        {/* Career Blueprint — full expanded view */}
        {scores?.careerMatches?.length > 0 && (
          <CareerBlueprintSection matches={scores.careerMatches} accent={accent} />
        )}

        {/* Lifestyle Vision */}
        {scores?.lifestyleBudget && (
          <div className="mt-6">
            <LifestyleVisionCard lifestyleBudget={scores.lifestyleBudget} accent={accent} />
          </div>
        )}

        {/* College Path */}
        {scores?.collegeRec && (
          <CollegePathCard rec={scores.collegeRec} accent={accent} />
        )}

        {/* Final thought */}
        <div className="card border border-white/10 mt-8 text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            <strong className="text-white">Final Thought</strong><br /><br />
            You said you want a certain kind of life.<br />
            This is your opportunity to decide:<br />
            <span className={`font-semibold ${accent.text}`}>
              Is that life worth the effort it will take to get there?
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={onFollowup}
            className={`btn-primary flex-1 ${accent.bg} text-navy font-bold`}
          >
            Answer Reflection Questions →
          </button>
          <button
            onClick={() => navigate(`/history/${userId}`)}
            className="btn-primary flex-1 bg-white/10 text-white hover:bg-white/15"
          >
            View Session History
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-sm hover:text-white/60 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Score Dashboard ──────────────────────────────────────────────────────────
function ScoreDashboard({ scores, accent, userId }) {
  const { overallScore, cores, flags, riskLevel, trajectory, lifestyleBudget } = scores;

  const riskColors = {
    Low: 'text-emerald-400',
    Medium: 'text-amber-400',
    High: 'text-red-400',
  };

  const trajectoryColors = {
    Improving: 'text-emerald-400',
    Stable: 'text-amber-400',
    Declining: 'text-red-400',
  };

  return (
    <div className="space-y-4">
      {/* Risk alert for high risk */}
      {riskLevel === 'High' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950 border border-red-800">
          <span className="text-red-400 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-red-300 text-sm font-semibold">High Risk Detected</p>
            <p className="text-red-400 text-sm mt-0.5">
              Multiple areas require immediate attention — not next month.
            </p>
          </div>
        </div>
      )}

      {/* Overall score + trajectory */}
      <div className="card border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <p className={`text-xs font-semibold uppercase tracking-widest ${accent.text}`}>
            Overall Blueprint Score
          </p>
          <span className={`text-xs font-medium ${trajectoryColors[trajectory] || 'text-white/40'}`}>
            {trajectory === 'Improving' ? '↑' : trajectory === 'Declining' ? '↓' : '→'} {trajectory}
          </span>
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-5xl font-bold text-white">{overallScore}</span>
          <span className="text-white/30 text-xl mb-1">/100</span>
          <span className={`ml-auto text-sm font-semibold px-3 py-1 rounded-full ${
            riskLevel === 'High' ? 'bg-red-900 text-red-300' :
            riskLevel === 'Medium' ? 'bg-amber-900 text-amber-300' :
            'bg-emerald-900 text-emerald-300'
          }`}>
            {riskLevel} Risk
          </span>
        </div>
        {/* Score bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${overallScore}%`, backgroundColor: accent.hex }}
          />
        </div>
      </div>

      {/* 6 Core Dimensions */}
      {cores && (
        <div className="card border border-white/10">
          <p className={`text-xs font-semibold uppercase tracking-widest ${accent.text} mb-4`}>
            Core Dimensions
          </p>
          <div className="space-y-3">
            {[
              { key: 'goalAlignment', label: 'Goal Alignment' },
              { key: 'responsibility', label: 'Responsibility' },
              { key: 'independence', label: 'Independence' },
              { key: 'confidence', label: 'Confidence' },
              { key: 'commitment', label: 'Commitment' },
              { key: 'avoidanceRisk', label: 'Avoidance Risk', invert: true },
            ].map(({ key, label, invert }) => {
              const val = cores[key];
              if (val === null || val === undefined) return null;
              const pct = Math.round((val / 10) * 100);
              const displayPct = invert ? 100 - pct : pct;
              const barColor = displayPct >= 60 ? '#10B981' : displayPct >= 40 ? '#F59E0B' : '#EF4444';
              const scoreLabel = getScoreLabel(invert ? 10 - val : val);
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/70 text-sm">{label}</span>
                    <span className="text-xs text-white/40">{scoreLabel}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${displayPct}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Red Flags */}
      {flags?.length > 0 && (
        <div className="card border border-red-900/50 bg-red-950/30">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">
            Areas Requiring Attention
          </p>
          <div className="space-y-2">
            {flags.slice(0, 4).map(flag => (
              <div key={flag.id} className="flex items-start gap-2">
                <span className={`flex-shrink-0 mt-0.5 w-2 h-2 rounded-full ${
                  flag.severity === 'high' ? 'bg-red-400' : 'bg-amber-400'
                }`} />
                <div>
                  <p className="text-white/80 text-sm font-medium">{flag.label}</p>
                  <p className="text-white/40 text-xs leading-snug">{flag.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lifestyle Budget */}
      {lifestyleBudget && (
        <div className="card border border-white/10">
          <p className={`text-xs font-semibold uppercase tracking-widest ${accent.text} mb-3`}>
            Target Lifestyle Reality Check
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm capitalize">{lifestyleBudget.tier} lifestyle</span>
            <span className="text-white font-bold">${lifestyleBudget.totalMonthly.toLocaleString()}/mo</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/40 text-xs">Annual income needed</span>
            <span className="text-white/70 text-sm">${lifestyleBudget.requiredAnnual.toLocaleString()}/yr</span>
          </div>
          <p className="text-white/40 text-xs leading-snug">{lifestyleBudget.note}</p>
        </div>
      )}
    </div>
  );
}

// ─── Career Blueprint Section ─────────────────────────────────────────────────
function CareerBlueprintSection({ matches, accent }) {
  const [activeCareer, setActiveCareer] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview | companies | degree | masters

  // Enrich each match with full blueprint data
  const enriched = matches.map(m => ({
    ...m,
    blueprint: CAREER_BLUEPRINTS[m.id] || null,
  }));

  const current = enriched[activeCareer];
  const bp = current?.blueprint;

  return (
    <div className="mt-6 space-y-4">
      <div className="card border border-white/10">
        <p className={`text-xs font-semibold uppercase tracking-widest ${accent.text} mb-1`}>
          Your Career Blueprint
        </p>
        <p className="text-white/50 text-xs mb-4">
          4 matched careers in sports — USA + Canada. Tap each to see the full path: degree, semester classes, salary, companies, and masters track.
        </p>

        {/* Career selector tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {enriched.map((c, i) => (
            <button
              key={c.id || i}
              onClick={() => { setActiveCareer(i); setActiveTab('overview'); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeCareer === i
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/8'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    backgroundColor: i === 0 ? accent.hex : 'rgba(255,255,255,0.15)',
                    color: i === 0 ? '#111' : '#fff',
                  }}
                >
                  {i + 1}
                </span>
                {i === 0 && <span className="text-xs text-white/40">#1 Match</span>}
              </div>
              <p className="text-white text-xs font-semibold leading-snug">
                {bp?.title || c.title}
              </p>
            </button>
          ))}
        </div>

        {/* Career detail tabs */}
        {bp && (
          <>
            <div className="flex gap-1 mb-4 border-b border-white/10 pb-2 overflow-x-auto">
              {['overview', 'companies', 'degree', 'masters'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                  style={activeTab === tab ? { backgroundColor: accent.hex, color: '#111' } : {}}
                >
                  {tab === 'overview' ? 'Overview' :
                   tab === 'companies' ? 'Companies' :
                   tab === 'degree' ? 'Degree Plan' : 'Masters Path'}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <p className="text-white font-bold text-base mb-1">{bp.title}</p>
                  {bp.alternativeTitles && (
                    <p className="text-white/40 text-xs">Also called: {bp.alternativeTitles.slice(0, 2).join(', ')}</p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-xs font-semibold text-white/40 mb-1 uppercase tracking-wide">Why This Fits You</p>
                  <p className="text-white/80 text-sm leading-relaxed">{bp.whyThisFits}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">What You Do Every Day</p>
                  <ul className="space-y-1.5">
                    {bp.dayToDay.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span style={{ color: accent.hex }} className="flex-shrink-0 mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Salary Over Time</p>
                  <div className="space-y-2">
                    {Object.values(bp.salary).map((level, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                        <div>
                          <p className="text-white text-xs font-semibold">{level.title}</p>
                          <p className="text-white/30 text-xs">{level.years}</p>
                        </div>
                        <p className="text-white font-bold text-sm" style={{ color: accent.hex }}>{level.range}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Perks of This Career</p>
                  <ul className="space-y-1.5">
                    {bp.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <span className="text-emerald-400 flex-shrink-0">✓</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Career Promotion Path</p>
                  <div className="space-y-2">
                    {bp.promotionPath.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            backgroundColor: i === 0 ? 'rgba(255,255,255,0.1)' : i === bp.promotionPath.length - 1 ? accent.hex : 'rgba(255,255,255,0.06)',
                            color: i === bp.promotionPath.length - 1 ? '#111' : '#fff',
                          }}
                        >
                          {step.level}
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-xs font-semibold">{step.title}</p>
                          <p className="text-white/30 text-xs">{step.when}</p>
                        </div>
                        <p className="text-white/60 text-xs font-medium">{step.salary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* COMPANIES TAB */}
            {activeTab === 'companies' && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wide">🇺🇸 USA Companies</p>
                  <div className="space-y-2">
                    {bp.usCompanies.map((co, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/8">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white text-sm font-semibold">{co.name}</p>
                            <p className="text-white/40 text-xs">{co.location}</p>
                            <p className="text-white/30 text-xs mt-0.5">{co.type}</p>
                          </div>
                          <a
                            href={`https://${co.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded-lg flex-shrink-0 transition-colors hover:opacity-80"
                            style={{ backgroundColor: accent.hex, color: '#111', fontWeight: 600 }}
                          >
                            Jobs →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-3 uppercase tracking-wide">🇨🇦 Canada Companies</p>
                  <div className="space-y-2">
                    {bp.canadaCompanies.map((co, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/8">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-white text-sm font-semibold">{co.name}</p>
                            <p className="text-white/40 text-xs">{co.location}</p>
                            <p className="text-white/30 text-xs mt-0.5">{co.type}</p>
                          </div>
                          <a
                            href={`https://${co.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded-lg flex-shrink-0 transition-colors hover:opacity-80"
                            style={{ backgroundColor: '#8B5CF6', color: '#fff', fontWeight: 600 }}
                          >
                            Jobs →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* DEGREE PLAN TAB */}
            {activeTab === 'degree' && bp.undergraduatePlan && (
              <div className="space-y-4">
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{bp.undergraduatePlan.degree}</p>
                  <p className="text-white/40 text-xs">{bp.undergraduatePlan.totalCredits} total credits — 4 years — 8 semesters</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Required Degree</p>
                  <p className="text-white/70 text-sm mb-1">{bp.requiredDegree.undergraduate}</p>
                  {bp.requiredDegree.certifications?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-white/30 mb-1">Also get these certifications:</p>
                      {bp.requiredDegree.certifications.map((cert, i) => (
                        <p key={i} className="text-xs text-white/50 flex items-center gap-1.5">
                          <span style={{ color: accent.hex }}>+</span> {cert}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wide">Semester-by-Semester Class Plan</p>
                  {bp.undergraduatePlan.semesters.map((sem, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-white/5">
                        <p className="text-white text-xs font-bold">{sem.term}</p>
                        <span className="text-white/30 text-xs">{sem.credits} credits</span>
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-white/40 text-xs mb-2 italic">{sem.focus}</p>
                        <ul className="space-y-1">
                          {sem.courses.map((course, j) => (
                            <li key={j} className="text-xs text-white/70 flex items-center gap-1.5">
                              <span style={{ color: accent.hex }} className="flex-shrink-0">·</span>
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MASTERS TAB */}
            {activeTab === 'masters' && bp.mastersPath && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="text-white font-bold text-sm mb-1">{bp.mastersPath.degree}</p>
                  <p className="text-white/40 text-xs mb-2">{bp.mastersPath.duration}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{bp.mastersPath.whyGetIt}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">What This Degree Unlocks</p>
                  {bp.mastersPath.rolesUnlocked.map((role, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 mb-2">
                      <p className="text-white text-xs font-semibold">{role.title}</p>
                      <p className="text-xs font-bold" style={{ color: accent.hex }}>{role.salary}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-white/40 mb-2 uppercase tracking-wide">Top Programs</p>
                  {bp.mastersPath.topPrograms.map((prog, i) => (
                    <p key={i} className="text-xs text-white/60 flex items-center gap-1.5 mb-1.5">
                      <span style={{ color: accent.hex }}>·</span> {prog}
                    </p>
                  ))}
                </div>

                {bp.mastersPath.semesterPlan && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wide">Masters Class Plan</p>
                    {bp.mastersPath.semesterPlan.map((sem, i) => (
                      <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                        <div className="px-3 py-2 bg-white/5">
                          <p className="text-white text-xs font-bold">{sem.term}</p>
                        </div>
                        <div className="px-3 py-2">
                          <ul className="space-y-1">
                            {sem.courses.map((course, j) => (
                              <li key={j} className="text-xs text-white/70 flex items-center gap-1.5">
                                <span style={{ color: accent.hex }} className="flex-shrink-0">·</span>
                                {course}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── College Path Card ────────────────────────────────────────────────────────
function CollegePathCard({ rec, accent }) {
  const pathColors = { A: '#10B981', B: '#F59E0B', C: '#3B82F6', D: '#EF4444' };
  const color = pathColors[rec.path] || accent.hex;

  return (
    <div className="card border border-white/10 mt-6">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ backgroundColor: color, color: '#111' }}
        >
          {rec.path}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Recommended Path</p>
          <p className="text-white font-semibold text-sm">{rec.label}</p>
        </div>
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-4">{rec.reasoning}</p>
      {rec.nextSteps?.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">Next Steps</p>
          <ol className="space-y-1.5">
            {rec.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-2 text-xs text-white/60">
                <span style={{ color }} className="font-bold flex-shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

// ─── Followup Screen ──────────────────────────────────────────────────────────
function FollowupScreen({ accent, followupAnswers, setFollowupAnswers, userId, navigate }) {
  return (
    <div className={`min-h-screen ${accent.class} px-4 py-12`}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Your Reflection</h2>
        <p className="text-white/40 text-sm mb-6">Take a moment to answer honestly — these help build your next session's context.</p>
        <div className="space-y-6">
          {FOLLOWUP_QUESTIONS.map((q, i) => (
            <div key={i} className="card border border-white/10">
              <p className={`font-medium mb-3 ${accent.text}`}>{i + 1}. {q}</p>
              <textarea
                className="input-text min-h-[80px]"
                placeholder="Your honest answer..."
                value={followupAnswers[i] || ''}
                onChange={e => setFollowupAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                rows={3}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate(`/mini/${userId}`)}
            className={`btn-primary w-full ${accent.bg} text-navy font-bold`}
          >
            Go to Weekly Check-In →
          </button>
          <button
            onClick={() => navigate(`/mini/${userId}`)}
            className="btn-primary w-full bg-white/10 text-white hover:bg-white/15"
          >
            Go to Monthly Check-In
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-white/30 text-sm text-center hover:text-white/60 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatAnalysis(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, match => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hul])/g, '$1')
    .replace(/(<\/[hul][^>]*>)<\/p>/g, '$1');
}
