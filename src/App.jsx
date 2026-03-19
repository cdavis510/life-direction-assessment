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
import WeeklySkillFlow from './components/WeeklySkillFlow';
import FreshmanKnowledgeTestPage from './components/Assessment/FreshmanKnowledgeTestPage';
import MonthlyMiniAssessment from './components/MonthlyMini/MonthlyMiniAssessment';
import QuarterlyAssessment from './components/Quarterly/QuarterlyAssessment';
import DemoScreen from './components/DemoScreen';
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
          <Route path="/login"                      element={<LoginScreen />} />
          <Route path="/demo"                       element={<DemoScreen />} />
          <Route path="/preview/weekly/:userId"     element={<WeeklySkillFlow />} />

          {/* Protected */}
          <Route path="/" element={<RequireAuth><Navigate to="/login" replace /></RequireAuth>} />
          <Route path="/welcome/:userId"               element={<WelcomeScreen />} />
          <Route path="/intro/:userId/:sessionId"      element={<AssessmentIntro />} />
          <Route path="/assessment/:userId/:sessionId" element={<Assessment />} />
          <Route path="/results/:userId/:sessionId"    element={<ResultsReveal />} />
          <Route path="/dashboard"                     element={<RequireAuth><MomDashboard /></RequireAuth>} />
          <Route path="/history/:userId"               element={<RequireAuth><SessionHistory /></RequireAuth>} />
          <Route path="/mini/:userId"                  element={<RequireAuth><MiniAssessment /></RequireAuth>} />
          <Route path="/weekly/:userId"                element={<RequireAuth><WeeklySkillFlow /></RequireAuth>} />
          <Route path="/weekly"                        element={<RequireAuth><WeeklySkillFlow /></RequireAuth>} />
          <Route path="/skill-test/:userId"            element={<RequireAuth><FreshmanKnowledgeTestPage /></RequireAuth>} />
          <Route path="/skill-test"                    element={<RequireAuth><FreshmanKnowledgeTestPage /></RequireAuth>} />
          <Route path="/monthly/:userId"               element={<RequireAuth><MonthlyMiniAssessment /></RequireAuth>} />
          <Route path="/quarterly/:userId"             element={<RequireAuth><QuarterlyAssessment /></RequireAuth>} />
          <Route path="*"                              element={<Navigate to="/login" replace />} />
        </Routes>
        <MobileNav />
      </ToastProvider>
    </ErrorBoundary>
  );
}
