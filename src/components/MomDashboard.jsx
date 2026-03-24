import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getLatestCompletedSession,
  getAllSessions,
  saveMomDashboard,
  getMomDashboardData,
  getSessionScores,
  saveMomScript,
  getMomScript,
} from '../hooks/useFirestore';
import { getMomDashboard, generateMomSonScript } from '../agents/momAgent';

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

const CORE_LABELS = {
  goalAlignment: 'Goal Alignment',
  responsibility: 'Responsibility',
  independence: 'Independence',
  confidence: 'Confidence',
  commitment: 'Commitment',
  avoidanceRisk: 'Avoidance Risk',
};

function getRiskColor(level) {
  if (level === 'High') return { text: 'text-red-400', bg: 'bg-red-900', pill: 'bg-red-900 text-red-300' };
  if (level === 'Medium') return { text: 'text-amber-400', bg: 'bg-amber-900', pill: 'bg-amber-900 text-amber-300' };
  return { text: 'text-emerald-400', bg: 'bg-emerald-900', pill: 'bg-emerald-900 text-emerald-300' };
}

function computeStrengthsAndConcerns(scores) {
  if (!scores?.cores) return { strengths: [], concerns: [] };
  const dims = ['goalAlignment', 'responsibility', 'independence', 'confidence', 'commitment'];
  const sorted = dims.filter(k => scores.cores[k] != null).sort((a, b) => scores.cores[a] - scores.cores[b]);
  return {
    concerns: sorted.slice(0, 3).map(k => ({ key: k, label: CORE_LABELS[k], val: scores.cores[k] })),
    strengths: sorted.slice(-3).reverse().map(k => ({ key: k, label: CORE_LABELS[k], val: scores.cores[k] })),
  };
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function MomDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading]               = useState(true);
  const [activeTab, setActiveTab]           = useState('overview');

  // Son data
  const [mekhiSession, setMekhiSession]     = useState(null);
  const [melvinSession, setMelvinSession]   = useState(null);
  const [mekhiSessions, setMekhiSessions]   = useState([]);
  const [melvinSessions, setMelvinSessions] = useState([]);
  const [mekhiScores, setMekhiScores]       = useState(null);
  const [melvinScores, setMelvinScores]     = useState(null);

  // Family analysis
  const [dashboardContent, setDashboardContent] = useState('');
  const [dashboardDate, setDashboardDate]       = useState(null);
  const [generatingDashboard, setGeneratingDashboard] = useState(false);
  const [dashboardError, setDashboardError]     = useState('');

  // Per-son scripts
  const [mekhiScript, setMekhiScript]       = useState(null);
  const [melvinScript, setMelvinScript]     = useState(null);
  const [generatingScript, setGeneratingScript] = useState({ mekhi: false, melvin: false });
  const [scriptError, setScriptError]       = useState({ mekhi: '', melvin: '' });

  useEffect(() => {
    async function loadAll() {
      try {
        const [mSess, elSess, mAll, elAll, saved] = await Promise.all([
          getLatestCompletedSession('mekhi'),
          getLatestCompletedSession('melvin'),
          getAllSessions('mekhi'),
          getAllSessions('melvin'),
          getMomDashboardData(),
        ]);

        setMekhiSession(mSess);
        setMelvinSession(elSess);
        setMekhiSessions(mAll.filter(s => s.status === 'complete'));
        setMelvinSessions(elAll.filter(s => s.status === 'complete'));

        const [mScores, elScores, mScript, elScript] = await Promise.all([
          mSess?.id ? getSessionScores('mekhi', mSess.id).catch(() => null) : Promise.resolve(null),
          elSess?.id ? getSessionScores('melvin', elSess.id).catch(() => null) : Promise.resolve(null),
          getMomScript('mekhi').catch(() => null),
          getMomScript('melvin').catch(() => null),
        ]);

        setMekhiScores(mScores);
        setMelvinScores(elScores);
        setMekhiScript(mScript);
        setMelvinScript(elScript);

        if (saved?.content) {
          setDashboardContent(saved.content);
          setDashboardDate(saved.updatedAt);
        }
      } catch (err) {
        console.error('[Dashboard] loadAll failed:', err);
      }
      setLoading(false);
    }
    loadAll();
  }, []);

  function formatScoresForPrompt(scores) {
    if (!scores) return null;
    const c = scores.cores || {};
    return `Assessment Scores:
- Overall Score: ${scores.overallScore}/100
- Risk Level: ${scores.riskLevel || 'Unknown'}
- Goal Alignment: ${c.goalAlignment?.toFixed(1) ?? '?'}/10
- Responsibility: ${c.responsibility?.toFixed(1) ?? '?'}/10
- Independence: ${c.independence?.toFixed(1) ?? '?'}/10
- Confidence: ${c.confidence?.toFixed(1) ?? '?'}/10
- Commitment: ${c.commitment?.toFixed(1) ?? '?'}/10
- Flags: ${scores.flags?.map(f => f.label).join(', ') || 'None'}`;
  }

  async function handleGenerateDashboard() {
    setGeneratingDashboard(true);
    setDashboardError('');
    try {
      const content = await getMomDashboard(
        mekhiSession?.results || formatScoresForPrompt(mekhiScores),
        melvinSession?.results || formatScoresForPrompt(melvinScores),
        mekhiSessions.slice(1),
        melvinSessions.slice(1),
      );
      setDashboardContent(content);
      await saveMomDashboard(content);
      setDashboardDate(new Date());
    } catch (err) {
      console.error('[Dashboard] family analysis failed:', err);
      setDashboardError('Failed to generate. Please try again.');
    }
    setGeneratingDashboard(false);
  }

  async function handleGenerateScript(userId) {
    const scores  = userId === 'mekhi' ? mekhiScores  : melvinScores;
    const session = userId === 'mekhi' ? mekhiSession : melvinSession;

    setGeneratingScript(prev => ({ ...prev, [userId]: true }));
    setScriptError(prev => ({ ...prev, [userId]: '' }));
    try {
      const script = await generateMomSonScript(userId, scores, session?.results || null);
      script.generatedAt = new Date().toISOString();
      await saveMomScript(userId, script);
      if (userId === 'mekhi') setMekhiScript(script);
      else setMelvinScript(script);
    } catch (err) {
      console.error(`[Dashboard] script gen failed for ${userId}:`, err);
      setScriptError(prev => ({ ...prev, [userId]: 'Script generation failed. Please try again.' }));
    }
    setGeneratingScript(prev => ({ ...prev, [userId]: false }));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center user-mom">
        <div className="text-white/40">Loading family dashboard…</div>
      </div>
    );
  }

  const TABS = [
    { id: 'overview',         label: 'Overview' },
    { id: 'mekhi',            label: 'Mekhi' },
    { id: 'melvin',           label: 'Melvin' },
    { id: 'family-analysis',  label: 'Family Analysis' },
    { id: 'saved-scripts',    label: 'Saved Scripts' },
  ];

  return (
    <div className="min-h-screen user-mom px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate('/')} className="text-white/40 text-xs hover:text-white/70 mb-3 block transition-colors">
            ← Back
          </button>
          <div className="section-label text-mom mb-1">Parent Dashboard</div>
          <h1 className="text-2xl font-bold text-white">Family Overview — Renee</h1>
        </div>

        {/* Son status pills */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <SonStatusPill name="Mekhi" accent="#06B6D4" scores={mekhiScores} latestSession={mekhiSession} sessions={mekhiSessions} onClick={() => setActiveTab('mekhi')} />
          <SonStatusPill name="Melvin" accent="#8B5CF6" scores={melvinScores} latestSession={melvinSession} sessions={melvinSessions} onClick={() => setActiveTab('melvin')} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-mom text-white' : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <OverviewTab
            mekhiScores={mekhiScores} melvinScores={melvinScores}
            mekhiSession={mekhiSession} melvinSession={melvinSession}
            mekhiSessions={mekhiSessions} melvinSessions={melvinSessions}
            navigate={navigate}
          />
        )}

        {activeTab === 'mekhi' && (
          <SonScriptTab
            userId="mekhi" name="Mekhi" accentHex="#06B6D4" accentClass="text-mekhi" accentBg="bg-mekhi"
            session={mekhiSession} sessions={mekhiSessions} scores={mekhiScores}
            script={mekhiScript}
            generating={generatingScript.mekhi}
            error={scriptError.mekhi}
            onGenerate={() => handleGenerateScript('mekhi')}
            navigate={navigate}
          />
        )}

        {activeTab === 'melvin' && (
          <SonScriptTab
            userId="melvin" name="Melvin" accentHex="#8B5CF6" accentClass="text-melvin" accentBg="bg-melvin"
            session={melvinSession} sessions={melvinSessions} scores={melvinScores}
            script={melvinScript}
            generating={generatingScript.melvin}
            error={scriptError.melvin}
            onGenerate={() => handleGenerateScript('melvin')}
            navigate={navigate}
          />
        )}

        {activeTab === 'family-analysis' && (
          <FamilyAnalysisTab
            mekhiSession={mekhiSession} melvinSession={melvinSession}
            dashboardContent={dashboardContent} dashboardDate={dashboardDate}
            generating={generatingDashboard} error={dashboardError}
            onGenerate={handleGenerateDashboard}
          />
        )}

        {activeTab === 'saved-scripts' && (
          <SavedScriptsTab
            mekhiScript={mekhiScript} melvinScript={melvinScript}
            mekhiScores={mekhiScores} melvinScores={melvinScores}
            mekhiSession={mekhiSession} melvinSession={melvinSession}
            generatingMekhi={generatingScript.mekhi} generatingMelvin={generatingScript.melvin}
            onGenerateMekhi={() => handleGenerateScript('mekhi')}
            onGenerateMelvin={() => handleGenerateScript('melvin')}
          />
        )}
      </div>
    </div>
  );
}

// ─── Son Status Pill ─────────────────────────────────────────────────────────

function SonStatusPill({ name, accent, scores, latestSession, sessions, onClick }) {
  const risk = scores?.riskLevel;
  const score = scores?.overallScore;
  const riskColor = risk ? getRiskColor(risk) : null;

  return (
    <button onClick={onClick} className="card border border-white/10 text-left hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm" style={{ color: accent }}>{name}</span>
        {risk && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColor.pill}`}>{risk} Risk</span>}
      </div>
      <div className="flex items-end gap-2">
        {score != null ? (
          <><span className="text-3xl font-bold text-white">{score}</span><span className="text-white/30 text-sm mb-0.5">/100</span></>
        ) : (
          <span className="text-white/30 text-sm">{sessions.length > 0 ? 'No scores yet' : 'No assessment yet'}</span>
        )}
      </div>
      {latestSession && (
        <p className="text-white/30 text-xs mt-1">Last: {timeSince(latestSession.completedAt || latestSession.createdAt)}</p>
      )}
    </button>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ mekhiScores, melvinScores, mekhiSession, melvinSession, mekhiSessions, melvinSessions, navigate }) {
  return (
    <div className="space-y-6">

      {/* Core score comparison */}
      {(mekhiScores || melvinScores) && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Core Score Comparison</p>
          <CoreScoreComparison mekhiScores={mekhiScores} melvinScores={melvinScores} />
        </div>
      )}

      {/* Side-by-side summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SonOverviewCard name="Mekhi" accentHex="#06B6D4" accentClass="text-mekhi" session={mekhiSession} sessions={mekhiSessions} scores={mekhiScores} navigate={navigate} userId="mekhi" />
        <SonOverviewCard name="Melvin" accentHex="#8B5CF6" accentClass="text-melvin" session={melvinSession} sessions={melvinSessions} scores={melvinScores} navigate={navigate} userId="melvin" />
      </div>

      {/* Quick actions */}
      <div className="card border border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Mekhi', sub: 'View session history', path: '/history/mekhi', accent: 'text-mekhi' },
            { label: 'Melvin', sub: 'View session history', path: '/history/melvin', accent: 'text-melvin' },
            { label: 'Mekhi — Weekly', sub: 'Sundays at 7pm', path: '/mini/mekhi', accent: 'text-mekhi' },
            { label: 'Melvin — Weekly', sub: 'Sundays at 7pm', path: '/mini/melvin', accent: 'text-melvin' },
          ].map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left">
              <p className={`${item.accent} text-xs font-semibold mb-0.5`}>{item.label}</p>
              <p className="text-white/60 text-xs">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SonOverviewCard({ name, accentHex, accentClass, session, sessions, scores, navigate, userId }) {
  const { strengths, concerns } = computeStrengthsAndConcerns(scores);
  const flags = scores?.flags?.filter(f => f.severity === 'high') || [];

  return (
    <div className="card border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-bold ${accentClass}`}>{name}</h3>
        <div className="flex items-center gap-2">
          {scores?.overallScore != null && <span className="text-white font-bold">{scores.overallScore}/100</span>}
          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/40">{sessions.length} session{sessions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {scores?.overallScore != null && (
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
          <div className="h-full rounded-full" style={{ width: `${scores.overallScore}%`, backgroundColor: accentHex }} />
        </div>
      )}

      {strengths.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-white/30 mb-1">Top Strengths</p>
          {strengths.map(s => (
            <div key={s.key} className="flex items-center gap-2 text-xs text-emerald-400 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              {s.label} — {s.val?.toFixed(1)}/10
            </div>
          ))}
        </div>
      )}

      {concerns.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-white/30 mb-1">Areas of Concern</p>
          {concerns.map(c => (
            <div key={c.key} className="flex items-center gap-2 text-xs text-amber-400 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {c.label} — {c.val?.toFixed(1)}/10
            </div>
          ))}
        </div>
      )}

      {flags.length > 0 && (
        <div className="mb-3">
          {flags.slice(0, 2).map(f => (
            <div key={f.id} className="flex items-center gap-1.5 text-xs text-red-300 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              {f.label}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1 text-xs mb-4">
        <div className="flex justify-between">
          <span className="text-white/40">Last assessment</span>
          <span className="text-white/70">{session ? timeSince(session.completedAt || session.createdAt) : 'Not yet'}</span>
        </div>
        {scores?.riskLevel && (
          <div className="flex justify-between">
            <span className="text-white/40">Risk level</span>
            <span className={getRiskColor(scores.riskLevel).text + ' font-medium'}>{scores.riskLevel}</span>
          </div>
        )}
        {scores?.trajectory && (
          <div className="flex justify-between">
            <span className="text-white/40">Trajectory</span>
            <span className={`font-medium ${scores.trajectory === 'Improving' ? 'text-emerald-400' : scores.trajectory === 'Declining' ? 'text-red-400' : 'text-amber-400'}`}>{scores.trajectory}</span>
          </div>
        )}
      </div>

      <button onClick={() => navigate(`/history/${userId}`)} className="w-full text-xs py-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/15 hover:text-white transition-colors">
        View History
      </button>
    </div>
  );
}

function CoreScoreComparison({ mekhiScores, melvinScores }) {
  const dims = ['goalAlignment', 'responsibility', 'independence', 'confidence', 'commitment'];
  return (
    <div className="space-y-3">
      {dims.map(key => {
        const mVal = mekhiScores?.cores?.[key];
        const eVal = melvinScores?.cores?.[key];
        const mPct = mVal != null ? Math.round((mVal / 10) * 100) : null;
        const ePct = eVal != null ? Math.round((eVal / 10) * 100) : null;
        return (
          <div key={key}>
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>{CORE_LABELS[key]}</span>
              <div className="flex gap-3">
                {mPct != null && <span className="text-mekhi">M:{mPct}%</span>}
                {ePct != null && <span className="text-melvin">E:{ePct}%</span>}
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              {mPct != null && <div className="absolute h-full rounded-full opacity-70" style={{ width: `${mPct}%`, backgroundColor: '#06B6D4' }} />}
              {ePct != null && <div className="absolute h-full rounded-full opacity-50" style={{ width: `${ePct}%`, backgroundColor: '#8B5CF6', top: '50%', transform: 'translateY(-50%)', height: '40%' }} />}
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

// ─── Son Script Tab ───────────────────────────────────────────────────────────

function SonScriptTab({ userId, name, accentHex, accentClass, accentBg, session, sessions, scores, script, generating, error, onGenerate, navigate }) {
  const { strengths, concerns } = computeStrengthsAndConcerns(scores);
  const [activeSection, setActiveSection] = useState('script');
  const riskColor = scores?.riskLevel ? getRiskColor(scores.riskLevel) : null;

  return (
    <div className="space-y-5">

      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold ${accentClass}`}>{name}'s Section</h2>
        <button onClick={() => navigate(`/history/${userId}`)} className={`text-xs px-3 py-1.5 rounded-lg text-white/60 bg-white/10 hover:bg-white/15`}>View History</button>
      </div>

      {/* Score card */}
      {scores ? (
        <div className="card border border-white/10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${accentClass} mb-1`}>Latest Scores</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">{scores.overallScore}</span>
                <span className="text-white/30 mb-1">/100</span>
              </div>
            </div>
            <div className="text-right">
              {riskColor && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColor.pill}`}>{scores.riskLevel} Risk</span>}
              <p className="text-white/30 text-xs mt-2">{session ? timeSince(session.completedAt || session.createdAt) : 'No session'}</p>
            </div>
          </div>

          {/* All core scores */}
          <div className="space-y-2 mb-4">
            {['goalAlignment', 'responsibility', 'independence', 'confidence', 'commitment'].map(key => {
              const val = scores.cores?.[key];
              if (val == null) return null;
              const pct = Math.round((val / 10) * 100);
              const color = pct >= 60 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#EF4444';
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-28 flex-shrink-0">{CORE_LABELS[key]}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                  <span className="text-white/40 text-xs w-8 text-right">{val?.toFixed(1)}</span>
                </div>
              );
            })}
          </div>

          {/* Strengths + Concerns */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-white/30 mb-2 font-semibold">Top Strengths</p>
              {strengths.map(s => (
                <div key={s.key} className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-xs text-emerald-300">{s.label}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-white/30 mb-2 font-semibold">Concern Areas</p>
              {concerns.map(c => (
                <div key={c.key} className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-xs text-amber-300">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card border border-white/10 text-center py-8">
          <p className="text-white/40">{name} hasn't completed an assessment yet.</p>
        </div>
      )}

      {/* Generate buttons */}
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={onGenerate}
          disabled={generating || !scores}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40"
          style={{ backgroundColor: generating ? 'rgba(255,255,255,0.1)' : accentHex, color: generating ? 'rgba(255,255,255,0.5)' : '#03131A' }}
        >
          {generating ? `Generating ${name}'s Script…` : script ? `Regenerate Mom Conversation Script` : `Generate Mom Conversation Script`}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Rendered script */}
      {script && (
        <ScriptDisplay script={script} name={name} accentHex={accentHex} accentClass={accentClass} />
      )}

      {/* Flags */}
      {scores?.flags?.filter(f => f.severity === 'high').length > 0 && (
        <div className="card border border-red-900/50 bg-red-950/20">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Priority Flags</p>
          {scores.flags.filter(f => f.severity === 'high').map(flag => (
            <div key={flag.id} className="flex items-start gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
              <div>
                <p className="text-white/80 text-sm font-medium">{flag.label}</p>
                <p className="text-white/40 text-xs">{flag.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Latest narrative */}
      {session?.results ? (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Latest Assessment Narrative</p>
          <div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(session.results) }} />
        </div>
      ) : session && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Latest Assessment Narrative</p>
          <p className="text-white/40 text-sm italic">
            {session.analysisStatus === 'failed'
              ? 'Blueprint generation failed — check the results page to retry.'
              : 'Blueprint pending generation — will appear here automatically once ready.'}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Script Display ───────────────────────────────────────────────────────────

function ScriptDisplay({ script, name, accentHex, accentClass }) {
  const savedDate = script.generatedAt ? new Date(script.updatedAt?.toDate?.() || script.generatedAt).toLocaleDateString() : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-widest ${accentClass}`}>Mom Conversation Script — {name}</p>
        {savedDate && <span className="text-white/30 text-xs">Saved {savedDate}</span>}
      </div>

      {/* Summary */}
      {script.summary && (
        <div className="card border border-white/10">
          <p className="text-xs text-white/40 mb-2 font-semibold uppercase tracking-widest">Summary</p>
          <p className="text-white/80 text-sm leading-relaxed">{script.summary}</p>
        </div>
      )}

      {/* Strengths + Concerns from AI */}
      {(script.strengths?.length > 0 || script.concerns?.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {script.strengths?.length > 0 && (
            <div className="card border border-emerald-900/40 bg-emerald-950/20">
              <p className="text-xs font-semibold text-emerald-400 mb-2">Strengths</p>
              {script.strengths.map((s, i) => <p key={i} className="text-xs text-white/70 mb-1">• {s}</p>)}
            </div>
          )}
          {script.concerns?.length > 0 && (
            <div className="card border border-amber-900/40 bg-amber-950/20">
              <p className="text-xs font-semibold text-amber-400 mb-2">Concerns</p>
              {script.concerns.map((c, i) => <p key={i} className="text-xs text-white/70 mb-1">• {c}</p>)}
            </div>
          )}
        </div>
      )}

      {/* Opening approach */}
      <div className="card border border-white/10">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">How to Open the Conversation</p>
        {script.openingTone && (
          <div className="mb-3">
            <p className="text-xs text-white/30 mb-1">Tone to Use</p>
            <p className="text-white/80 text-sm">{script.openingTone}</p>
          </div>
        )}
        {script.sayFirst && (
          <div className="mb-3">
            <p className="text-xs text-white/30 mb-1">Say This First</p>
            <p className="text-white/90 text-sm font-medium italic leading-relaxed" style={{ color: accentHex }}>{script.sayFirst}</p>
          </div>
        )}
        {script.avoidSaying?.length > 0 && (
          <div>
            <p className="text-xs text-white/30 mb-2">Avoid Saying</p>
            {script.avoidSaying.map((s, i) => (
              <div key={i} className="flex items-start gap-2 mb-1">
                <span className="text-red-400 text-xs mt-0.5">✕</span>
                <p className="text-xs text-red-300">{s}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statements */}
      <div className="grid grid-cols-1 gap-4">
        {script.validatingStatements?.length > 0 && (
          <div className="card border border-white/10">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">3 Validating Statements</p>
            {script.validatingStatements.map((s, i) => (
              <div key={i} className="flex gap-3 mb-2">
                <span className="text-xs font-bold text-white/30 w-4 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/80 italic">{s}</p>
              </div>
            ))}
          </div>
        )}
        {script.directButLovingStatements?.length > 0 && (
          <div className="card border border-white/10">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">3 Direct But Loving Statements</p>
            {script.directButLovingStatements.map((s, i) => (
              <div key={i} className="flex gap-3 mb-2">
                <span className="text-xs font-bold flex-shrink-0 w-4" style={{ color: accentHex }}>{i + 1}.</span>
                <p className="text-sm text-white/80 italic">{s}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Talking Points */}
      {script.talkingPoints?.length > 0 && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">5 Customized Talking Points</p>
          {script.talkingPoints.map((tp, i) => (
            <div key={i} className="flex gap-3 mb-3 pb-3 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
              <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: accentHex + '33', color: accentHex }}>{i + 1}</span>
              <p className="text-sm text-white/80 leading-relaxed">{tp}</p>
            </div>
          ))}
        </div>
      )}

      {/* Blueprint */}
      <div className="card border border-white/10">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Talking Points Blueprint</p>
        <div className="space-y-3">
          {script.bestCommunicationStyle && <BlueprintRow label="Best Communication Style" value={script.bestCommunicationStyle} />}
          {script.resistancePoints?.length > 0 && (
            <div>
              <p className="text-xs text-white/30 mb-1">Likely Resistance Points</p>
              {script.resistancePoints.map((r, i) => <p key={i} className="text-xs text-white/70 mb-0.5">• {r}</p>)}
            </div>
          )}
          {script.focusThisWeek?.length > 0 && (
            <div>
              <p className="text-xs text-white/30 mb-1">Focus This Week</p>
              {script.focusThisWeek.map((f, i) => <p key={i} className="text-xs text-emerald-300 mb-0.5">✓ {f}</p>)}
            </div>
          )}
          {script.doNotFocusYet?.length > 0 && (
            <div>
              <p className="text-xs text-white/30 mb-1">Do Not Focus Yet</p>
              {script.doNotFocusYet.map((f, i) => <p key={i} className="text-xs text-amber-300 mb-0.5">— {f}</p>)}
            </div>
          )}
        </div>
      </div>

      {/* Conversation goals + boundary */}
      <div className="grid grid-cols-1 gap-3">
        {script.shortConversationGoal && (
          <div className="card border border-white/10">
            <p className="text-xs text-white/30 mb-1">Short Conversation Goal</p>
            <p className="text-white/80 text-sm">{script.shortConversationGoal}</p>
          </div>
        )}
        {script.mediumConversationGoal && (
          <div className="card border border-white/10">
            <p className="text-xs text-white/30 mb-1">Medium Conversation Goal</p>
            <p className="text-white/80 text-sm">{script.mediumConversationGoal}</p>
          </div>
        )}
        {script.boundaryToHold && (
          <div className="card border border-violet-800/50 bg-violet-950/20">
            <p className="text-xs text-violet-400 font-semibold mb-1">Boundary to Hold</p>
            <p className="text-white/80 text-sm">{script.boundaryToHold}</p>
          </div>
        )}
      </div>

      {/* Next 7 days */}
      {script.next7DaysActions?.length > 0 && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Next 7 Days — Action Steps</p>
          {script.next7DaysActions.map((a, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <span className="text-xs font-bold text-white/30 w-4 flex-shrink-0">{i + 1}.</span>
              <p className="text-sm text-white/80">{a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BlueprintRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-white/30 mb-0.5">{label}</p>
      <p className="text-sm text-white/80">{value}</p>
    </div>
  );
}

// ─── Family Analysis Tab ──────────────────────────────────────────────────────

function FamilyAnalysisTab({ mekhiSession, melvinSession, dashboardContent, dashboardDate, generating, error, onGenerate }) {
  const hasData = mekhiSession || melvinSession;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Family Analysis</h2>
        <button
          onClick={onGenerate}
          disabled={generating || !hasData}
          className="btn-primary bg-mom text-white font-semibold text-sm px-4 py-2 disabled:opacity-40"
        >
          {generating ? 'Generating…' : dashboardContent ? 'Refresh Analysis' : 'Generate Analysis'}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {dashboardContent ? (
        <MomDashboardSections content={dashboardContent} date={dashboardDate} />
      ) : (
        <div className="card border border-white/10 text-center py-10">
          {!hasData ? (
            <p className="text-white/40">No assessments completed yet.</p>
          ) : (
            <p className="text-white/60">Generate the family analysis to see insights about both boys together.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Saved Scripts Tab ────────────────────────────────────────────────────────

function SavedScriptsTab({ mekhiScript, melvinScript, mekhiScores, melvinScores, mekhiSession, melvinSession, generatingMekhi, generatingMelvin, onGenerateMekhi, onGenerateMelvin }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Saved Mom Scripts</h2>
      <div className="grid grid-cols-1 gap-6">
        <SavedScriptPreview
          userId="mekhi" name="Mekhi" accentHex="#06B6D4" accentClass="text-mekhi"
          script={mekhiScript} scores={mekhiScores} session={mekhiSession}
          generating={generatingMekhi} onGenerate={onGenerateMekhi}
        />
        <SavedScriptPreview
          userId="melvin" name="Melvin" accentHex="#8B5CF6" accentClass="text-melvin"
          script={melvinScript} scores={melvinScores} session={melvinSession}
          generating={generatingMelvin} onGenerate={onGenerateMelvin}
        />
      </div>
    </div>
  );
}

function SavedScriptPreview({ userId, name, accentHex, accentClass, script, scores, session, generating, onGenerate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-bold ${accentClass}`}>{name}</h3>
          {script?.generatedAt && (
            <p className="text-white/30 text-xs mt-0.5">Script generated {new Date(script.updatedAt?.toDate?.() || script.generatedAt).toLocaleDateString()}</p>
          )}
        </div>
        <div className="flex gap-2">
          {script && (
            <button onClick={() => setExpanded(e => !e)} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/60 hover:bg-white/15">
              {expanded ? 'Collapse' : 'View Script'}
            </button>
          )}
          <button
            onClick={onGenerate}
            disabled={generating || !scores}
            className="text-xs px-3 py-1.5 rounded-lg font-semibold disabled:opacity-40"
            style={{ backgroundColor: accentHex + '22', color: accentHex }}
          >
            {generating ? 'Generating…' : script ? 'Regenerate' : 'Generate'}
          </button>
        </div>
      </div>

      {!script && !generating && (
        <p className="text-white/30 text-sm">{scores ? `No script saved yet for ${name}.` : `${name} hasn't completed an assessment yet.`}</p>
      )}

      {script && !expanded && (
        <p className="text-white/60 text-sm leading-relaxed">{script.summary}</p>
      )}

      {script && expanded && (
        <ScriptDisplay script={script} name={name} accentHex={accentHex} accentClass={accentClass} />
      )}
    </div>
  );
}

// ─── Family Analysis Sections (parsed markdown) ───────────────────────────────

function MomDashboardSections({ content, date }) {
  const sections = {};
  const lines = content.split('\n');
  let current = 'intro';
  let buf = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (buf.length) sections[current] = buf.join('\n').trim();
      current = line.replace('## ', '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
      buf = [];
    } else { buf.push(line); }
  }
  if (buf.length) sections[current] = buf.join('\n').trim();

  function get(keys) {
    for (const k of keys) { if (sections[k]) return sections[k]; }
    for (const [k, v] of Object.entries(sections)) {
      for (const key of keys) { if (k.includes(key.slice(0, 10))) return v; }
    }
    return null;
  }

  const overview     = get(['family_overview', 'intro']);
  const mekhiPrivate = get(['what_mekhi_is_not_saying', 'mekhi_not_saying']);
  const melvinPrivate= get(['what_melvin_is_not_saying', 'melvin_not_saying']);
  const mekhiScripts = get(['how_to_reach_mekhi', 'reach_mekhi']);
  const melvinScripts= get(['how_to_reach_melvin', 'reach_melvin']);
  const momGoal      = get(['mom_s_growth_goal', 'mom_growth_goal', 'growth_goal']);
  const rightNow     = get(['what_to_do_right_now', 'right_now', 'do_right_now']);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">AI Family Analysis</p>
        {date && <span className="text-white/30 text-xs">Updated {formatDate(date)}</span>}
      </div>
      {overview && <AnalysisCard title="Family Overview" accent="text-mom">{overview}</AnalysisCard>}
      {(mekhiPrivate || melvinPrivate) && (
        <div className="rounded-xl border border-violet-800 bg-violet-950/40 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-violet-400 text-sm">🔒</span>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-300">Private — For Your Eyes Only</p>
          </div>
          {mekhiPrivate && <div className="mb-3"><p className="text-xs font-semibold text-mekhi mb-2">What Mekhi Is Not Saying</p><div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(mekhiPrivate) }} /></div>}
          {melvinPrivate && <div><p className="text-xs font-semibold text-melvin mb-2">What Melvin Is Not Saying</p><div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(melvinPrivate) }} /></div>}
        </div>
      )}
      {(mekhiScripts || melvinScripts) && (
        <div className="card border border-white/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-mom mb-3">Communication Scripts</p>
          {mekhiScripts && <div className="mb-4"><p className="text-xs font-semibold text-mekhi mb-2">Reaching Mekhi</p><div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(mekhiScripts) }} /></div>}
          {melvinScripts && <div><p className="text-xs font-semibold text-melvin mb-2">Reaching Melvin</p><div className="ai-result text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(melvinScripts) }} /></div>}
        </div>
      )}
      {momGoal && <AnalysisCard title="Your Growth Goal This Month" accent="text-mom" border="border-mom/30" bg="bg-mom/5">{momGoal}</AnalysisCard>}
      {rightNow && <AnalysisCard title="Do These 3 Things in the Next 48 Hours" accent="text-emerald-400">{rightNow}</AnalysisCard>}
      {!overview && !mekhiPrivate && !melvinPrivate && (
        <div className="card border border-white/10">
          <div className="ai-result text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(content) }} />
        </div>
      )}
    </div>
  );
}

function AnalysisCard({ title, accent, border = 'border-white/10', bg = '', children }) {
  return (
    <div className={`card ${border} ${bg}`}>
      <p className={`text-xs font-semibold uppercase tracking-widest ${accent} mb-3`}>{title}</p>
      <div className="ai-result text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: formatAnalysis(children) }} />
    </div>
  );
}
