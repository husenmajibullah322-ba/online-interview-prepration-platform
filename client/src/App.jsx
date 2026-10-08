import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import DashboardLayout from './components/DashboardLayout'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import OverviewPage from './pages/OverviewPage'
import PracticePage from './pages/PracticePage'
import MockInterviewPage from './pages/MockInterviewPage'
import ProgressPage from './pages/ProgressPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function ProtectedRoute({ children }) {
  const { authenticated } = useApp()
  return authenticated ? children : <Navigate to="/login" replace />
}

function PublicAuthRoute() {
  const { authenticated } = useApp()
  return authenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<PublicAuthRoute />} />
      <Route path="/signup" element={<PublicAuthRoute />} />
      <Route path="/register" element={<PublicAuthRoute />} />

      {/* Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<OverviewPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/mock-interviews" element={<MockInterviewPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}