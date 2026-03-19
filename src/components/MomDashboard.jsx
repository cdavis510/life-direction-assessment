import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getLatestCompletedSession,
  getAllSessions,
  saveMomDashboard,
  getMomDashboardData,
  getSessionScores,
} from '../hooks/useFirestore';
import { getMomDashboard } from '../agents/momAgent';

function formatDate(ts) {
  if (!ts) return null;
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeSince(ts) {
  if (!ts) return null;
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return formatDate(ts);
}

export default function MomDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [dashboardContent, setDashboardContent] = useState('');
  const [dashboardDate, setDashboardDate] = useState(null);
  const [error, setError] = useState('');

  const [mekhiData, setMekhiData] = useState(null);
  const [melvinData, setMelvinData] = useState(null);
  const [mekhiSessions, setMekhiSessions] = useState([]);
  const [melvinSessions, setMelvinSessions] = useState([]);
  const [mekhiScores, setMekhiScores] = useState(null);
  const [melvinScores, setMelvinScores] = useState(null);

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function loadAll() {
      try {
        const [
          mekhiSession,
          melvinSession,
          mekhiAllSessions,
          melvinAllSessions,
          savedDashboard,
        ] = await Promise.all([
          getLatestCompletedSession('mekhi'),
          getLatestCompletedSession('melvin'),
          getAllSessions('mekhi'),
          getAllSessions('melvin'),
          getMomDashboardData(),
        ]);

        setMekhiData(mekhiSession);
        setMelvinData(melvinSession);
        const mekhiComplete = mekhiAllSessions.filter(s => s.status === 'complete');
        const melvinComplete = melvinAllSessions.filter(s => s.status === 'complete');
        setMekhiSessions(mekhiComplete);
        setMelvinSessions(melvinComplete);

        // Load scores for latest sessions
        if (mekhiSession?.id) {
          getSessionScores('mekhi', mekhiSession.id).then(setMekhiScores).catch(() => {});
        }
        if (melvinSession?.id) {
          getSessionScores('melvin', melvinSession.id).then(setMelvinScores).catch(() => {});
        }

        if (savedDashboard?.content) {
          setDashboardContent(savedDashboard.content);
          setDashboardDate(savedDashboard.updatedAt);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data.');
      }
      setLoading(false);
    }
    loadAll();
  }, []);

  async function handleGenerate() {
    setGenerating(true);
    setError('');
    try {
      const content = await getMomDashboard(
        mekhiData?.results || null,
        melvinData?.results || null,
        mekhiSessions.slice(1),
        melvinSessions.slice(1)
      );
      setDashboardContent(content);
      await saveMomDashboard(content);
      setDashboardDate(new Date());
    } catch {
      setError('Failed to generate dashboard. Please try again.');
    }
    setGenerating(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center user-mom">
        <div className="text-white/40">Loading family dashboard...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'mekhi', label: 'Mekhi' },
    { id: 'melvin', label: 'Melvin' },
  ];

  return (
    <div className="min-h-screen user-mom px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-white/40 text-xs hover:text-white/70 mb-3 block transition-colors"
            >
              ← Back
            </button>
            <div className="section-label text-mom mb-1">Parent Dashboard</div>
            <h1 className="text-2xl font-bold text-white">Family Overview — Renee</h1>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating || (!mekhiData && !melvinData)}
            className="btn-primary bg-mom text-white font-semibold text-sm px-4 py-2 disabled:opacity-40"
          >
            {generating ? 'Generating...' : dashboardContent ? 'Refresh Analysis' : 'Generate Analysis'}
          </button>
        </div>

        {/* Son status bar */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <SonStatusPill
            name="Mekhi"
            accent="#06B6D4"
            sessions={mekhiSessions}
            latestSession={mekhiData}
            scores={mekhiScores}
            onClick={() => setActiveTab('mekhi')}
          />
          <SonStatusPill
            name="Melvin"
            accent="#8B5CF6"
            sessions={melvinSessions}
            latestSession={melvinData}
            scores={melvinScores}
            onClick={() => setActiveTab('melvin')}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-mom text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <OverviewTab
            mekhiData={mekhiData}
            melvinData={melvinData}
            mekhiSessions={mekhiSessions}
            melvinSessions={melvinSessions}
            mekhiScores={mekhiScores}
            melvinScores={melvinScores}
            dashboardContent={dashboardContent}
            dashboardDate={dashboardDate}
            generating={generating}
            error={error}
            onGenerate={handleGenerate}
            navigate={navigate}
          />
        )}

        {activeTab === 'mekhi' && (
          <SonTab
            userId="mekhi"
            name="Mekhi"
            accentColor="mekhi"
            accentHex="#06B6D4"
            session={mekhiData}
            sessions={mekhiSessions}
            scores={mekhiScores}
            navigate={navigate}
          />
        )}

        {activeTab === 'melvin' && (
          <SonTab
            userId="melvin"
            name="Melvin"
            accentColor="melvin"
            accentHex="#8B5CF6"
            session={melvinData}
            sessions={melvinSessions}
            scores={melvinScores}
            navigate={navigate}
          />
        )}
      </div>
    </div>
  );
}

// ─── Son Status Pill ─────────────────────────────────────────────────────────
function SonStatusPill({ name, accent, sessions, latestSession, scores, onClick }) {
  const riskLevel = scores?.riskLevel;
  const overallScore = scores?.overallScore;

  return (
    <button
      onClick={onClick}
      className="card border border-white/10 text-left hover:border-white/20 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm" style={{ color: accent }}>{name}</span>
        {riskLevel && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            riskLevel === 'High' ? 'bg-red-900 text-red-300' :
            riskLevel === 'Medium' ? 'bg-amber-900 text-amber-300' :
            'bg-emerald-900 text-emerald-300'
          }`}>
            {riskLevel} Risk
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        {overallScore != null ? (
          <>
            <span className="text-3xl font-bold text-white">{overallScore}</span>
            <span className="text-white/30 text-sm mb-0.5">/100</span>
          </>
        ) : (
          <span className="text-white/30 text-sm">
            {sessions.length > 0 ? 'Scores loading' : 'No assessment yet'}
          </span>
        )}
      </div>
      {latestSession && (
        <p className="text-white/30 text-xs mt-1">
          Last: {timeSince(latestSession.completedAt || latestSession.createdAt)}
        </p>
      )}
    </button>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ mekhiData, melvinData, mekhiSessions, melvinSessions, mekhiScores, melvinScores, dashboardContent, dashboardDate, generating, error, onGenerate, navigate }) {
  return (
    <div className="space-y-6">
      {/* Side-by-side score comparison */}
      {(mekhiScores || melvinScores) && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Core Score Comparison</p>
          <CoreScoreComparison mekhiScores={mekhiScores} melvinScores={melvinScores} />
        </div>
      )}

      {/* Side-by-side summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SonSummaryCard
          name="Mekhi"
          accent="mekhi"
          accentText="text-mekhi"
          accentHex="#06B6D4"
          sessions={mekhiSessions}
          latestSession={mekhiData}
          scores={mekhiScores}
          navigate={navigate}
          userId="mekhi"
        />
        <SonSummaryCard
          name="Melvin"
          accent="melvin"
          accentText="text-melvin"
          accentHex="#8B5CF6"
          sessions={melvinSessions}
          latestSession={melvinData}
          scores={melvinScores}
          navigate={navigate}
          userId="melvin"
        />
      </div>

      {/* AI Dashboard — parsed into sections */}
      {dashboardContent ? (
        <MomDashboardSections content={dashboardContent} date={dashboardDate} />
      ) : (
        <div className="card border border-white/10 text-center py-10">
          {!mekhiData && !melvinData ? (
            <>
              <p className="text-white/50 mb-2">No assessments completed yet.</p>
              <p className="text-white/30 text-sm">Once Mekhi or Melvin completes their assessment, you'll see their full analysis here.</p>
            </>
          ) : (
            <>
              <p className="text-white/70 mb-4">
                {mekhiData && !melvinData && 'Mekhi has completed his assessment.'}
                {!mekhiData && melvinData && 'Melvin has completed his assessment.'}
                {mekhiData && melvinData && 'Both boys have completed their assessments.'}
              </p>
              {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
              <button
                onClick={onGenerate}
                disabled={generating}
                className="btn-primary bg-mom text-white font-semibold"
              >
                {generating ? 'Generating...' : 'Generate Family Analysis'}
              </button>
            </>
          )}
        </div>
      )}

      {/* Quick Actions for Mom */}
      <div className="card border border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/history/mekhi')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-mekhi text-xs font-semibold mb-0.5">Mekhi</p>
            <p className="text-white/60 text-xs">View session history</p>
          </button>
          <button
            onClick={() => navigate('/history/melvin')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-melvin text-xs font-semibold mb-0.5">Melvin</p>
            <p className="text-white/60 text-xs">View session history</p>
          </button>
          <button
            onClick={() => navigate('/mini/mekhi')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-mekhi text-xs font-semibold mb-0.5">Mekhi — Weekly</p>
            <p className="text-white/60 text-xs">Sundays at 7pm</p>
          </button>
          <button
            onClick={() => navigate('/mini/melvin')}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <p className="text-melvin text-xs font-semibold mb-0.5">Melvin — Weekly</p>
            <p className="text-white/60 text-xs">Sundays at 7pm</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Core Score Comparison ────────────────────────────────────────────────────
function CoreScoreComparison({ mekhiScores, melvinScores }) {
  const dimensions = [
    { key: 'goalAlignment', label: 'Goal Alignment' },
    { key: 'responsibility', label: 'Responsibility' },
    { key: 'independence', label: 'Independence' },
    { key: 'confidence', label: 'Confidence' },
    { key: 'commitment', label: 'Commitment' },
  ];

  return (
    <div className="space-y-3">
      {dimensions.map(({ key, label }) => {
        const mVal = mekhiScores?.cores?.[key];
        const elVal = melvinScores?.cores?.[key];
        const mPct = mVal != null ? Math.round((mVal / 10) * 100) : null;
        const elPct = elVal != null ? Math.round((elVal / 10) * 100) : null;
        return (
          <div key={key}>
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>{label}</span>
              <div className="flex gap-3">
                {mPct != null && <span className="text-mekhi">M:{mPct}%</span>}
                {elPct != null && <span className="text-melvin">E:{elPct}%</span>}
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              {mPct != null && (
                <div
                  className="absolute h-full rounded-full opacity-70"
                  style={{ width: `${mPct}%`, backgroundColor: '#06B6D4' }}
                />
              )}
              {elPct != null && (
                <div
                  className="absolute h-full rounded-full opacity-70 top-0"
                  style={{ width: `${elPct}%`, backgroundColor: '#8B5CF6', top: '50%', transform: 'translateY(-50%)', height: '40%' }}
                />
              )}
            </div>
          </div>
        );
      })}
      <div className="flex gap-4 text-xs text-white/30 mt-2">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-mekhi inline-block" /> Mekhi</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-melvin inline-block" /> Melvin</span>
      </div>
    </div>
  );
}

// ─── Son Summary Card ─────────────────────────────────────────────────────────
function SonSummaryCard({ name, accent, accentText, accentHex, sessions, latestSession, scores, navigate, userId }) {
  const flags = scores?.flags?.filter(f => f.severity === 'high') || [];

  return (
    <div className={`card border border-${accent}/30`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-bold ${accentText}`}>{name}</h3>
        <div className="flex items-center gap-2">
          {scores?.overallScore != null && (
            <span className="text-white font-bold">{scores.overallScore}/100</span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full bg-${accent}/10 ${accentText}`}>
            {sessions.length} session{sessions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Score bar */}
      {scores?.overallScore != null && (
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full"
            style={{ width: `${scores.overallScore}%`, backgroundColor: accentHex }}
          />
        </div>
      )}

      {/* High priority flags */}
      {flags.length > 0 && (
        <div className="mb-3 space-y-1">
          {flags.slice(0, 2).map(flag => (
            <div key={flag.id} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              <p className="text-red-300 text-xs">{flag.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1.5 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-white/40">Last assessment</span>
          <span className="text-white/70">
            {latestSession
              ? timeSince(latestSession.completedAt || latestSession.createdAt)
              : 'Not yet'}
          </span>
        </div>
        {scores?.riskLevel && (
          <div className="flex justify-between">
            <span className="text-white/40">Risk level</span>
            <span className={`text-xs font-medium ${
              scores.riskLevel === 'High' ? 'text-red-400' :
              scores.riskLevel === 'Medium' ? 'text-amber-400' :
              'text-emerald-400'
            }`}>
              {scores.riskLevel}
            </span>
          </div>
        )}
        {scores?.trajectory && (
          <div className="flex justify-between">
            <span className="text-white/40">Trajectory</span>
            <span className={`text-xs font-medium ${
              scores.trajectory === 'Improving' ? 'text-emerald-400' :
              scores.trajectory === 'Declining' ? 'text-red-400' :
              'text-amber-400'
            }`}>
              {scores.trajectory}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(`/history/${userId}`)}
        className="w-full text-xs py-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/15 hover:text-white transition-colors"
      >
        View History
      </button>
    </div>
  );
}

// ─── Son Tab ──────────────────────────────────────────────────────────────────
function SonTab({ userId, name, accentColor, accentHex, session, sessions, scores, navigate }) {
  const accentText = `text-${accentColor}`;
  const accentBg = `bg-${accentColor}`;
  const collegeRec = scores?.collegeRec;
  const careerMatches = scores?.careerMatches;
  const flags = scores?.flags || [];
  const cores = scores?.cores;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold ${accentText}`}>{name}'s Section</h2>
        <button
          onClick={() => navigate(`/history/${userId}`)}
          className={`btn-primary ${accentBg} text-navy text-sm font-semibold px-4 py-2`}
        >
          View All Assessments
        </button>
      </div>

      {/* Scores at a glance */}
      {scores && (
        <div className="card border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <p className={`text-xs font-semibold uppercase tracking-widest ${accentText}`}>Score Overview</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              scores.riskLevel === 'High' ? 'bg-red-900 text-red-300' :
              scores.riskLevel === 'Medium' ? 'bg-amber-900 text-amber-300' :
              'bg-emerald-900 text-emerald-300'
            }`}>
              {scores.riskLevel} Risk
            </span>
          </div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold text-white">{scores.overallScore}</span>
            <span className="text-white/30 mb-0.5">/100</span>
          </div>
          {cores && (
            <div className="space-y-2">
              {[
                { key: 'goalAlignment', label: 'Goal Alignment' },
                { key: 'responsibility', label: 'Responsibility' },
                { key: 'commitment', label: 'Commitment' },
              ].map(({ key, label }) => {
                const val = cores[key];
                if (val == null) return null;
                const pct = Math.round((val / 10) * 100);
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-white/50 text-xs w-28 flex-shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: pct >= 60 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#EF4444' }}
                      />
                    </div>
                    <span className="text-white/40 text-xs w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Red flags */}
      {flags.filter(f => f.severity === 'high').length > 0 && (
        <div className="card border border-red-900/50 bg-red-950/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Priority Concerns</p>
          <div className="space-y-2">
            {flags.filter(f => f.severity === 'high').map(flag => (
              <div key={flag.id} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-white/80 text-sm font-medium">{flag.label}</p>
                  <p className="text-white/40 text-xs leading-snug">{flag.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* College Path Recommendation */}
      {collegeRec && (
        <div className="card border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm text-navy"
              style={{ backgroundColor: accentHex }}
            >
              {collegeRec.path}
            </span>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Recommended Path</p>
              <p className={`font-semibold text-sm ${accentText}`}>{collegeRec.label}</p>
            </div>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-3">{collegeRec.reasoning}</p>
          {collegeRec.nextSteps?.length > 0 && (
            <ol className="space-y-1">
              {collegeRec.nextSteps.slice(0, 3).map((step, i) => (
                <li key={i} className="flex gap-2 text-xs text-white/50">
                  <span className={`${accentText} font-bold flex-shrink-0`}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Career matches (top 2) */}
      {careerMatches?.length > 0 && (
        <div className="card border border-white/10">
          <p className={`text-xs font-semibold uppercase tracking-widest ${accentText} mb-3`}>Top Career Matches</p>
          <div className="space-y-3">
            {careerMatches.slice(0, 2).map((track, i) => (
              <div key={track.title} className="p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-white/30">#{i + 1}</span>
                  <p className="text-white text-sm font-medium">{track.title}</p>
                </div>
                <p className="text-white/40 text-xs leading-snug">{track.whyMekhi}</p>
                <p className="text-white/30 text-xs mt-1">
                  Entry {track.salaryRange.entry} → Senior {track.salaryRange.senior}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest AI results */}
      {session?.results ? (
        <div className="card border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Latest Assessment Narrative</h3>
            <span className="text-white/30 text-xs">
              {formatDate(session.completedAt || session.createdAt)}
            </span>
          </div>
          <div
            className="ai-result text-white/80 text-sm"
            dangerouslySetInnerHTML={{ __html: formatAnalysis(session.results) }}
          />
        </div>
      ) : (
        <div className="card border border-white/10 text-center py-8">
          <p className="text-white/40">{name} hasn't completed an assessment yet.</p>
        </div>
      )}

      {/* Growth Timeline */}
      {sessions.length > 1 && (
        <div className="card border border-white/10">
          <h3 className="font-semibold text-white mb-4">Growth Timeline</h3>
          <div className="space-y-3">
            {sessions.map((s, i) => (
              <div key={s.id} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full ${accentBg} flex items-center justify-center text-navy text-xs font-bold flex-shrink-0`}>
                  {sessions.length - i}
                </div>
                <div className="flex-1">
                  <p className="text-white/70 text-sm">Assessment #{sessions.length - i}</p>
                  <p className="text-white/30 text-xs">{formatDate(s.completedAt || s.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mom Dashboard Sections (parsed) ─────────────────────────────────────────
function MomDashboardSections({ content, date }) {
  // Parse the content into named sections by ## headers
  const sections = {};
  const lines = content.split('\n');
  let currentSection = 'intro';
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentLines.length > 0) sections[currentSection] = currentLines.join('\n').trim();
      currentSection = line.replace('## ', '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) sections[currentSection] = currentLines.join('\n').trim();

  const PRIVATE_SECTIONS = ['what_mekhi_is_not_saying', 'what_melvin_is_not_saying'];
  const SCRIPT_SECTIONS = ['how_to_reach_mekhi____communication_scripts', 'how_to_reach_melvin____communication_scripts'];

  // Normalize — try to find sections even if header varies slightly
  function getSection(keys) {
    for (const key of keys) {
      if (sections[key]) return sections[key];
    }
    // fuzzy match
    for (const [k, v] of Object.entries(sections)) {
      for (const key of keys) {
        if (k.includes(key.slice(0, 12))) return v;
      }
    }
    return null;
  }

  const overview = getSection(['family_overview', 'intro']);
  const mekhiPrivate = getSection(['what_mekhi_is_not_saying', 'mekhi_not_saying']);
  const melvinPrivate = getSection(['what_melvin_is_not_saying', 'melvin_not_saying']);
  const mekhiScripts = getSection(['how_to_reach_mekhi', 'mekhi_communication', 'reach_mekhi']);
  const melvinScripts = getSection(['how_to_reach_melvin', 'melvin_communication', 'reach_melvin']);
  const momGoal = getSection(['mom_s_growth_goal', 'mom_growth_goal', 'growth_goal']);
  const rightNow = getSection(['what_to_do_right_now', 'right_now', 'do_right_now']);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">AI Family Analysis — Renee</p>
        {date && <span className="text-white/30 text-xs">Updated {formatDate(date)}</span>}
      </div>

      {/* Family Overview */}
      {overview && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-mom mb-3">Family Overview</p>
          <div className="ai-result text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(overview) }} />
        </div>
      )}

      {/* PRIVATE — What the boys are not saying */}
      {(mekhiPrivate || melvinPrivate) && (
        <div className="rounded-xl border border-violet-800 bg-violet-950/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-violet-400 text-sm">🔒</span>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Private — For Your Eyes Only</p>
          </div>
          <p className="text-violet-400/60 text-xs mb-4 leading-snug">
            The boys do not see this section. This is what the AI detected they are likely carrying but not saying. Use this to show up for them — not to confront them with it.
          </p>
          {mekhiPrivate && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-mekhi mb-2">What Mekhi Is Not Saying</p>
              <div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(mekhiPrivate) }} />
            </div>
          )}
          {melvinPrivate && (
            <div>
              <p className="text-xs font-semibold text-melvin mb-2">What Melvin Is Not Saying</p>
              <div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(melvinPrivate) }} />
            </div>
          )}
        </div>
      )}

      {/* Communication Scripts */}
      {(mekhiScripts || melvinScripts) && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-mom mb-3">Communication Scripts</p>
          <p className="text-white/40 text-xs mb-4">Word-for-word scripts for real situations. Use these — they are built for how each son actually communicates.</p>
          {mekhiScripts && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-mekhi mb-2">Reaching Mekhi</p>
              <div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(mekhiScripts) }} />
            </div>
          )}
          {melvinScripts && (
            <div>
              <p className="text-xs font-semibold text-melvin mb-2">Reaching Melvin</p>
              <div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(melvinScripts) }} />
            </div>
          )}
        </div>
      )}

      {/* Mom's Growth Goal */}
      {momGoal && (
        <div className="card border border-mom/30 bg-mom/5">
          <p className="text-xs font-semibold uppercase tracking-widest text-mom mb-3">Your Growth Goal This Month</p>
          <div className="ai-result text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(momGoal) }} />
        </div>
      )}

      {/* What to Do Right Now */}
      {rightNow && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Do These 3 Things in the Next 48 Hours</p>
          <div className="ai-result text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(rightNow) }} />
        </div>
      )}

      {/* Fallback — if parsing failed, show raw */}
      {!overview && !mekhiPrivate && !melvinPrivate && (
        <div className="card border border-white/10">
          <div className="ai-result text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(content) }} />
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatAnalysis(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}
