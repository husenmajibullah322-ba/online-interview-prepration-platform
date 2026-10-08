import { useNavigate } from 'react-router-dom'
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function AuthPage() {
  const navigate = useNavigate()
  const {
    authMode,
    showPassword,
    setShowPassword,
    authMessage,
    setAuthMessage,
    authLoading,
    form,
    setForm,
    updateForm,
    submitAuth,
  } = useApp()

  return (
    <div className="auth-shell">
      <section className="auth-visual">
        <div
          className="auth-brand"
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer' }}
        >
          <span className="brand-mark">/</span>
          Prepwise
        </div>

        <div className="auth-quote">
          <span>“</span>
          <h1>
            Prepare with purpose.
            <br />
            <em>Show up ready.</em>
          </h1>
          <p>
            Everything you need to feel confident in your next interview, in one
            focused workspace.
          </p>

          <div className="auth-proof">
            <div className="proof-avatars">
              <i>R</i>
              <i>M</i>
              <i>S</i>
            </div>
            <span>
              <strong>12,000+</strong> candidates preparing smarter
            </span>
          </div>
        </div>

        <div className="auth-decoration">
          <i />
          <i />
          <i />
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-mobile-brand">
            <span className="brand-mark">/</span>
            Prepwise
          </div>

          <div className="auth-heading">
            <p className="eyebrow">
              {authMode === 'login' ? 'WELCOME BACK' : 'GET STARTED'}
            </p>
            <h2>
              {authMode === 'login'
                ? 'Good to see you.'
                : 'Create your account.'}
            </h2>
            <p>
              {authMode === 'login'
                ? 'Pick up where you left off.'
                : 'Your interview preparation starts here.'}
            </p>
          </div>

          <form className="auth-form" onSubmit={submitAuth}>
            {authMode === 'register' && (
              <label>
                Full name
                <div className="input-wrap">
                  <UserRound size={17} />
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Your full name"
                    required
                  />
                </div>
              </label>
            )}

            <label>
              Email address
              <div className="input-wrap">
                <Mail size={17} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <label>
              Password
              <div className="input-wrap">
                <LockKeyhole size={17} />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={updateForm}
                  placeholder="Enter your password"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            {authMode === 'login' && (
              <div className="auth-options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setAuthMessage('Password reset is not connected yet.')
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            {authMessage && <p className="auth-error">{authMessage}</p>}

            <button
              className="auth-submit"
              type="submit"
              disabled={authLoading}
            >
              {authLoading
                ? 'Please wait...'
                : authMode === 'login'
                  ? 'Sign in'
                  : 'Create account'}

              {!authLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="auth-switch">
            {authMode === 'login'
              ? 'New to Prepwise?'
              : 'Already have an account?'}

            <button
              type="button"
              onClick={() => {
                setAuthMessage('')
                setForm({
                  name: '',
                  email: '',
                  password: '',
                })
                navigate(authMode === 'login' ? '/signup' : '/login')
              }}
            >
              {authMode === 'login' ? 'Create an account' : 'Sign in'}
            </button>
          </div>

          <p className="auth-terms">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  )
}
