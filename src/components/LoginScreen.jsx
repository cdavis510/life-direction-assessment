import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, EMAIL_TO_USER } from '../firebase';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      const userId = EMAIL_TO_USER[email.trim().toLowerCase()];
      if (userId === 'mom') {
        navigate('/dashboard');
      } else if (userId) {
        navigate(`/welcome/${userId}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Incorrect email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError('Enter your email above first, then click Forgot Password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSent(true);
      setError('');
    } catch {
      setError('Could not send reset email. Check the address and try again.');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, rgba(0,200,255,0.10), transparent 28%), linear-gradient(180deg, #050505 0%, #0A0A0A 100%)',
      color: '#F5F5F5',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.05)',
            color: '#8FDBFF',
            fontSize: 11,
            letterSpacing: 1.4,
            fontWeight: 800,
            textTransform: 'uppercase',
          }}>
            Life Direction Assessment System
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          borderRadius: 24,
          padding: '40px 36px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              color: '#8FDBFF',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}>
              Private Sign In
            </div>
            <h1 style={{
              fontSize: 42,
              lineHeight: 1.05,
              margin: 0,
              fontWeight: 900,
              color: '#F5F5F5',
            }}>
              Your Future Blueprint
            </h1>
            <p style={{ color: '#A3A3A3', marginTop: 12, fontSize: 17, margin: '12px 0 0' }}>
              Private. Focused. Built for you.
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 16 }}>
            {/* Email */}
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#D0D0D0', fontWeight: 600 }}>Email Address</span>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#FFFFFF',
                  padding: '15px 16px',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                }}
              />
            </label>

            {/* Password */}
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#D0D0D0', fontWeight: 600 }}>Password</span>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#FFFFFF',
                  padding: '15px 16px',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                }}
              />
            </label>

            {/* Remember me */}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#C9C9C9', fontSize: 14, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ accentColor: '#00C8FF' }}
              />
              Remember me
            </label>

            {/* Error */}
            {error && (
              <div style={{
                padding: '12px 16px',
                borderRadius: 12,
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#FCA5A5',
                fontSize: 14,
              }}>
                {error}
              </div>
            )}

            {/* Reset sent */}
            {resetSent && (
              <div style={{
                padding: '12px 16px',
                borderRadius: 12,
                background: 'rgba(0,200,255,0.10)',
                border: '1px solid rgba(0,200,255,0.25)',
                color: '#8FDBFF',
                fontSize: 14,
              }}>
                Password reset email sent. Check your inbox.
              </div>
            )}

            {/* Sign In */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'rgba(0,200,255,0.5)' : '#00C8FF',
                color: '#03131A',
                fontWeight: 700,
                borderRadius: 14,
                padding: '15px 22px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: 16,
                marginTop: 4,
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

            {/* Forgot Password */}
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: 'transparent',
                color: '#8FDBFF',
                fontWeight: 600,
                borderRadius: 14,
                padding: '12px 22px',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Forgot Password?
            </button>
          </form>

          {/* Privacy note */}
          <div style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            color: '#BDBDBD',
            fontSize: 13,
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            Your assessment, progress, and results are private.
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 12, marginTop: 24 }}>
          Built with love for a family that refuses to give up.
        </p>
      </div>
    </div>
  );
}
