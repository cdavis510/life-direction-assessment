import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import MobileNav from './components/MobileNav';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import AssessmentIntro from './components/AssessmentIntro';
import Assessment from './components/Assessment';
import ResultsReveal from './components/ResultsReveal';
import MomDashboard from './components/MomDashboard';
import SessionHistory from './components/SessionHistory';
import MiniAssessment from './components/MiniAssessment';
import WeeklyCheckin from './components/WeeklyCheckin';
import AgentSelect from './components/ai-agents/AgentSelect';
import AvatarScreen from './components/ai-agents/AvatarScreen';
import ResultsPreview from './components/ai-agents/ResultsPreview';
import { useAuth } from './hooks/useAuth';

// Redirects to /login if not authenticated
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.3)',
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
    }}>
      Loading…
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Protected */}
          <Route path="/" element={<RequireAuth><Navigate to="/login" replace /></RequireAuth>} />
          <Route path="/welcome/:userId"                    element={<RequireAuth><WelcomeScreen /></RequireAuth>} />
          <Route path="/intro/:userId/:sessionId"          element={<RequireAuth><AssessmentIntro /></RequireAuth>} />
          <Route path="/assessment/:userId/:sessionId"     element={<RequireAuth><Assessment /></RequireAuth>} />
          <Route path="/results/:userId/:sessionId"    element={<RequireAuth><ResultsReveal /></RequireAuth>} />
          <Route path="/dashboard"                     element={<RequireAuth><MomDashboard /></RequireAuth>} />
          <Route path="/history/:userId"               element={<RequireAuth><SessionHistory /></RequireAuth>} />
          <Route path="/mini/:userId"                  element={<RequireAuth><MiniAssessment /></RequireAuth>} />
          <Route path="/weekly/:userId"                element={<RequireAuth><WeeklyCheckin /></RequireAuth>} />
          <Route path="/weekly"                        element={<RequireAuth><WeeklyCheckin /></RequireAuth>} />
          <Route path="/agents"                        element={<RequireAuth><AgentSelect /></RequireAuth>} />
          <Route path="/agents/:agentId"               element={<RequireAuth><AvatarScreen /></RequireAuth>} />
          <Route path="/agents/results-preview"        element={<RequireAuth><ResultsPreview /></RequireAuth>} />
          <Route path="*"                              element={<Navigate to="/login" replace />} />
        </Routes>
        <MobileNav />
      </ToastProvider>
    </ErrorBoundary>
  );
}
