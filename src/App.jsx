import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import MobileNav from './components/MobileNav';
import UserSelect from './components/UserSelect';
import WelcomeScreen from './components/WelcomeScreen';
import Assessment from './components/Assessment';
import ResultsReveal from './components/ResultsReveal';
import MomDashboard from './components/MomDashboard';
import SessionHistory from './components/SessionHistory';
import MiniAssessment from './components/MiniAssessment';
import WeeklyCheckin from './components/WeeklyCheckin';
import AgentSelect from './components/ai-agents/AgentSelect';
import AvatarScreen from './components/ai-agents/AvatarScreen';

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Routes>
          <Route path="/"                          element={<UserSelect />} />
          <Route path="/welcome/:userId"           element={<WelcomeScreen />} />
          <Route path="/assessment/:userId/:sessionId" element={<Assessment />} />
          <Route path="/results/:userId/:sessionId"    element={<ResultsReveal />} />
          <Route path="/dashboard"                 element={<MomDashboard />} />
          <Route path="/history/:userId"           element={<SessionHistory />} />
          <Route path="/mini/:userId"              element={<MiniAssessment />} />
          <Route path="/weekly/:userId"            element={<WeeklyCheckin />} />
          <Route path="/weekly"                    element={<WeeklyCheckin />} />
          <Route path="/agents"                    element={<AgentSelect />} />
          <Route path="/agents/:agentId"           element={<AvatarScreen />} />
          <Route path="*"                          element={<Navigate to="/" replace />} />
        </Routes>
        <MobileNav />

        {/* ── Footer — desktop only ── */}
        <footer className="hidden md:block text-center py-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: '#0E0C0A' }}>
          <p className="text-white/15 text-xs">
            Built with love by Renee · Life Direction Assessment System · Family First
          </p>
        </footer>
      </ToastProvider>
    </ErrorBoundary>
  );
}
