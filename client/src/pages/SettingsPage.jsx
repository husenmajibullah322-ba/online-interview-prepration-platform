import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, UserRound, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { setSettingsOpen, userName, userEmail, handleLogout } = useApp()

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">ACCOUNT SETTINGS</p>
          <h1>
            Settings
            <span>✦</span>
          </h1>
          <p className="subcopy">
            Manage your account information and preferences.
          </p>
        </div>

        <button
          className="outline-btn"
          onClick={() => {
            setSettingsOpen(false)
            navigate('/dashboard')
          }}
        >
          <ArrowRight size={15} />
          Back to overview
        </button>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">PROFILE</p>
            <h2>Your account</h2>
          </div>
          <UserRound size={20} />
        </div>

        <div
          style={{
            marginTop: '30px',
            display: 'grid',
            gap: '20px',
          }}
        >
          <div>
            <small className="muted">Full name</small>
            <h3>{userName}</h3>
          </div>

          <div>
            <small className="muted">Email address</small>
            <h3>{userEmail}</h3>
          </div>

          <div>
            <small className="muted">Account status</small>
            <h3>Active</h3>
          </div>
        </div>

        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="primary-btn"
            onClick={() => {
              setSettingsOpen(false)
              navigate('/dashboard')
            }}
          >
            <Check size={16} />
            Done
          </button>

          <button className="outline-btn" onClick={handleLogout}>
            <X size={16} />
            Sign out
          </button>
        </div>
      </section>
    </>
  )
}
