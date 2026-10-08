import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    label: 'Practice',
    icon: BookOpen,
  },
  {
    label: 'Mock interviews',
    icon: Users,
  },
  {
    label: 'My progress',
    icon: Trophy,
  },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    menuOpen,
    settingsOpen,
    handleNavigation,
    userName,
    userEmail,
    handleLogout,
  } = useApp()

  return (
    <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}>
      <div
        className="brand"
        onClick={() => navigate('/dashboard')}
        style={{ cursor: 'pointer' }}
      >
        <span className="brand-mark">/</span>
        <span>Prepwise</span>
      </div>

      <div className="workspace-label">YOUR WORKSPACE</div>

      <nav>
        {navItems.map(({ label, icon: Icon }) => (
          <button
            className={`nav-item ${
              (label === 'Overview' && location.pathname === '/dashboard') ||
              (label === 'Practice' && location.pathname === '/practice') ||
              (label === 'Mock interviews' &&
                location.pathname === '/mock-interviews') ||
              (label === 'My progress' && location.pathname === '/progress')
                ? 'active'
                : ''
            }`}
            key={label}
            onClick={() => handleNavigation(label)}
          >
            <Icon size={18} strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-card">
        <Sparkles size={18} />
        <strong>Interview season?</strong>
        <span>Build a plan that fits your timeline.</span>
        <button onClick={() => handleNavigation('My progress')}>
          View your plan
          <ArrowRight size={14} />
        </button>
      </div>

      <button
        className={`nav-item ${
          location.pathname === '/settings' || settingsOpen ? 'active' : ''
        }`}
        onClick={() => handleNavigation('Settings')}
      >
        <Settings size={18} strokeWidth={1.8} />
        Settings
      </button>

      <div className="profile">
        <div className="avatar">
          {userName
            .split(' ')
            .map((word) => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div>
          <strong>{userName}</strong>
          <span>{userEmail || 'Free plan'}</span>
        </div>

        <ChevronDown size={15} />
      </div>

      <button
        className="nav-item"
        onClick={handleLogout}
        style={{ marginTop: '8px' }}
      >
        <X size={18} strokeWidth={1.8} />
        Sign out
      </button>
    </aside>
  )
}
