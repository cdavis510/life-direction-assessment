import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastActivity, getAllSessions, createSession } from '../hooks/useFirestore';

const USERS = [
  {
    id: 'mekhi',
    name: 'Mekhi',
    label: 'Sports & Media Careers',
    sections: 17,
    color: 'mekhi',
    accent: '#06B6D4',
    emoji: '🎙️',
  },
  {
    id: 'melvin',
    name: 'Melvin',
    label: 'Finance & Sports Business',
    sections: 16,
    color: 'melvin',
    accent: '#8B5CF6',
    emoji: '📈',
  },
  {
    id: 'mom',
    name: 'Mom',
    label: 'Parent Dashboard',
    sections: null,
    color: 'mom',
    accent: '#F43F5E',
    emoji: '🌹',
  },
];

function formatRelativeDate(date) {
  if (!date) return null;
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
}

function UserCard({ user, onSelect, loading }) {
  const [lastActivity, setLastActivity] = useState(null);
  const [hasInProgress, setHasInProgress] = useState(false);
  const [cardLoading, setCardLoading] = useState(true);

  useEffect(() => {
    if (user.id === 'mom') { setCardLoading(false); return; }
    async function load() {
      try {
        const [activity, sessions] = await Promise.all([
          getLastActivity(user.id),
          getAllSessions(user.id),
        ]);
        setLastActivity(activity);
        setHasInProgress(sessions.some(s => s.status === 'in_progress'));
      } catch {}
      setCardLoading(false);
    }
    load();
  }, [user.id]);

  const borderColor = {
    mekhi: 'border-mekhi/40 hover:border-mekhi',
    melvin: 'border-melvin/40 hover:border-melvin',
    mom: 'border-mom/40 hover:border-mom',
  }[user.color];

  const accentBg = {
    mekhi: 'bg-mekhi/10',
    melvin: 'bg-melvin/10',
    mom: 'bg-mom/10',
  }[user.color];

  const accentText = {
    mekhi: 'text-mekhi',
    melvin: 'text-melvin',
    mom: 'text-mom',
  }[user.color];

  return (
    <button
      onClick={() => onSelect(user)}
      disabled={loading}
      className={`card border-2 ${borderColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <div className={`w-14 h-14 ${accentBg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
        {user.emoji}
      </div>

      <h2 className={`text-2xl font-bold mb-1 ${accentText}`}>{user.name}</h2>
      <p className="text-white/60 text-sm mb-4">{user.label}</p>

      {user.sections && (
        <p className="text-white/40 text-xs mb-3">{user.sections} sections</p>
      )}

      {cardLoading ? (
        <div className="h-4 bg-white/10 rounded animate-pulse w-24" />
      ) : (
        <div className="flex items-center gap-2 mt-auto">
          {lastActivity ? (
            <>
              <span className={`text-xs px-2 py-1 rounded-full ${accentBg} ${accentText} font-medium`}>
                {hasInProgress ? 'Continue' : 'Start New'}
              </span>
              <span className="text-white/30 text-xs">{formatRelativeDate(lastActivity)}</span>
            </>
          ) : (
            <span className={`text-xs px-2 py-1 rounded-full ${accentBg} ${accentText} font-medium`}>
              Begin Assessment
            </span>
          )}
        </div>
      )}
    </button>
  );
}

export default function UserSelect() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSelect(user) {
    setLoading(true);
    try {
      if (user.id === 'mom') {
        navigate('/dashboard');
        return;
      }
      navigate(`/welcome/${user.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Life Direction Assessment System
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-3 leading-tight"
            style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.04em' }}>
            Your Future Blueprint
          </h1>
          <p className="text-white/50 text-lg">Who is taking this assessment today?</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USERS.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onSelect={handleSelect}
              loading={loading}
            />
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-1">
              <p className="text-white/20 text-xs">Weekly Check-In — Sundays 7pm</p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/weekly/mekhi')}
                  className="text-mekhi/60 text-xs hover:text-mekhi transition-colors underline underline-offset-4"
                >
                  Mekhi
                </button>
                <button
                  onClick={() => navigate('/weekly/melvin')}
                  className="text-melvin/60 text-xs hover:text-melvin transition-colors underline underline-offset-4"
                >
                  Melvin
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-white/20 text-xs">Monthly Check-In</p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/mini/mekhi')}
                  className="text-mekhi/60 text-xs hover:text-mekhi transition-colors underline underline-offset-4"
                >
                  Mekhi
                </button>
                <button
                  onClick={() => navigate('/mini/melvin')}
                  className="text-melvin/60 text-xs hover:text-melvin transition-colors underline underline-offset-4"
                >
                  Melvin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agents */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/agents')}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3B82F620, #F59E0B15, #10B98115)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <span>◈</span>
            <span>AI Agents — Quinn · Kane · Caleb</span>
          </button>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Built with love for a family that refuses to give up.
        </p>
      </div>
    </div>
  );
}
