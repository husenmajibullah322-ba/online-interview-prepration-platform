import { useLocation } from 'react-router-dom'
import { Bell, Menu, Search, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Topbar() {
  const location = useLocation()
  const {
    menuOpen,
    setMenuOpen,
    formattedDate,
    searchOpen,
    setSearchOpen,
    searchTerm,
    setSearchTerm,
  } = useApp()

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/practice':
        return 'Practice'
      case '/mock-interviews':
        return 'Mock interviews'
      case '/progress':
        return 'My progress'
      case '/settings':
        return 'Settings'
      default:
        return 'Overview'
    }
  }

  return (
    <header className="topbar">
      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <div className="crumb">
        {formattedDate}
        <span>/</span>
        <strong>{getPageTitle()}</strong>
      </div>

      <div className="top-actions">
        <div className="search-box-wrap">
          <button
            aria-label="Search"
            type="button"
            onClick={() => setSearchOpen((previous) => !previous)}
          >
            <Search size={19} />
          </button>

          {searchOpen && (
            <input
              className="search-input"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks or tracks"
              aria-label="Search tasks"
            />
          )}
        </div>

        <button
          aria-label="Notifications"
          className="notification"
          type="button"
          onClick={() => setSearchOpen(false)}
        >
          <Bell size={19} />
          <i />
        </button>
      </div>
    </header>
  )
}
