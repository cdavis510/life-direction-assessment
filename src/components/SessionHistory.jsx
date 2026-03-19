import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSessions } from '../hooks/useFirestore';

const USER_ACCENT = {
  mekhi: { text: 'text-mekhi', bg: 'bg-mekhi', class: 'user-mekhi', name: 'Mekhi' },
  melvin: { text: 'text-melvin', bg: 'bg-melvin', class: 'user-melvin', name: 'Melvin' },
};

function formatDate(ts) {
  if (!ts) return 'Unknown date';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function SessionHistory() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const accent = USER_ACCENT[userId] || USER_ACCENT.mekhi;

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    getAllSessions(userId)
      .then(setSessions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const completed = sessions.filter(s => s.status === 'complete');
  const inProgress = sessions.find(s => s.status === 'in_progress');

  return (
    <div className={`min-h-screen ${accent.class} px-4 py-10`}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-white/40 text-sm hover:text-white/70 mb-6 flex items-center gap-2 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className={`section-label ${accent.text} mb-1`}>{accent.name}</div>
            <h1 className="text-2xl font-bold text-white">Assessment History</h1>
          </div>
          <button
            onClick={() => navigate(`/welcome/${userId}`)}
            className={`btn-primary ${accent.bg} text-navy font-semibold text-sm px-4 py-2`}
          >
            + New Assessment
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* In progress */}
            {inProgress && (
              <div className="card border border-white/20 mb-6 flex items-center justify-between">
                <div>
                  <p className={`text-sm font-semibold ${accent.text}`}>In Progress</p>
                  <p className="text-white/50 text-xs">Started {formatDate(inProgress.createdAt)}</p>
                </div>
                <button
                  onClick={() => navigate(`/assessment/${userId}/${inProgress.id}`)}
                  className={`btn-primary ${accent.bg} text-navy font-semibold text-sm px-4 py-2`}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* Completed sessions */}
            {completed.length === 0 ? (
              <div className="card border border-white/10 text-center py-12">
                <p className="text-white/40">No completed assessments yet.</p>
                <button
                  onClick={() => navigate(`/welcome/${userId}`)}
                  className={`btn-primary mt-4 ${accent.bg} text-navy font-semibold`}
                >
                  Take Your First Assessment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {completed.map((session, i) => (
                  <div key={session.id} className="card border border-white/10">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpanded(expanded === session.id ? null : session.id)}
                    >
                      <div>
                        <p className="text-white font-semibold">
                          Assessment #{completed.length - i}
                        </p>
                        <p className="text-white/40 text-xs">
                          {formatDate(session.completedAt || session.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">
                          Complete
                        </span>
                        <span className="text-white/30 text-sm">
                          {expanded === session.id ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {expanded === session.id && session.results && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div
                          className="ai-result text-white/70 text-sm"
                          dangerouslySetInnerHTML={{
                            __html: formatAnalysis(session.results).slice(0, 2000) + (session.results.length > 2000 ? '...' : ''),
                          }}
                        />
                        <button
                          onClick={() => navigate(`/results/${userId}/${session.id}`)}
                          className={`mt-4 btn-primary ${accent.bg} text-navy text-sm font-semibold px-4 py-2`}
                        >
                          View Full Results →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
}

function formatAnalysis(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}
