import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Flame,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  Play,
  Search,
  Settings,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  X,
  RotateCcw,
  BarChart3,
  Award,
} from 'lucide-react'

import {
  evaluateMockAnswer,
  evaluatePracticeAnswer,
  getNextQuestion,
  summarizeMockInterview,
} from './utils/practiceSession'

import './App.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [dashboardError, setDashboardError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [activeNav, setActiveNav] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [answerShown, setAnswerShown] = useState(false)
  const [practiceMode, setPracticeMode] = useState(false)
  const [practiceQuestion, setPracticeQuestion] = useState(null)
  const [practiceAnswer, setPracticeAnswer] = useState('')
  const [practiceResult, setPracticeResult] = useState(null)
  const [practiceLoading, setPracticeLoading] = useState(false)
  const [practiceScore, setPracticeScore] = useState(0)
  const [practiceTotal, setPracticeTotal] = useState(0)
  const [practiceFinished, setPracticeFinished] = useState(false)
  const [practiceAnswered, setPracticeAnswered] = useState(0)

  const [mockInterview, setMockInterview] = useState(false)
  const mockQuestions = [
    'Tell me about yourself and your technical background.',
    'What is React and why do you use it?',
    'What is the difference between let, const and var?',
    'What is an API and how does a frontend application use it?',
    'Why should we hire you for this position?',
  ]

  const [mockQuestionIndex, setMockQuestionIndex] = useState(0)
  const [mockAnswer, setMockAnswer] = useState('')
  const [mockSubmitted, setMockSubmitted] = useState(false)
  const [mockFinished, setMockFinished] = useState(false)
  const [mockCompletedQuestions, setMockCompletedQuestions] = useState(0)
  const [mockAnswers, setMockAnswers] = useState([])
  const [mockResult, setMockResult] = useState(null)
  const [mockValidation, setMockValidation] = useState('')

  const mockQuestion = mockQuestions[mockQuestionIndex]

  const [localProgress, setLocalProgress] = useState({
    completedPractice: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    mockInterviews: 0,
    mockInterviewScore: 0,
  })

  const API_URL = import.meta.env.VITE_API_URL || ''

  const practiceQuestions = [
    {
      id: 1,
      category: 'JavaScript',
      difficulty: 'Medium',
      hint: 'Focus on scope and reassignment.',
      question:
        'What is the difference between let, const and var in JavaScript?',
      answer:
        'let and const are block-scoped, while var is function-scoped. A let variable can be reassigned, const cannot be reassigned, and var can be redeclared.',
    },
    {
      id: 2,
      category: 'React',
      difficulty: 'Easy',
      hint: 'Think about UI building and component architecture.',
      question: 'What is React?',
      answer:
        'React is a JavaScript library used for building user interfaces, especially component-based web applications.',
    },
    {
      id: 3,
      category: 'APIs',
      difficulty: 'Easy',
      hint: 'Focus on communication between systems.',
      question: 'What is an API?',
      answer:
        'An API is a way for different software applications to communicate and exchange data with each other.',
    },
    {
      id: 4,
      category: 'Databases',
      difficulty: 'Easy',
      hint: 'Think about document-oriented storage.',
      question: 'What is MongoDB?',
      answer:
        'MongoDB is a NoSQL database that stores data in flexible JSON-like documents.',
    },
    {
      id: 5,
      category: 'JavaScript',
      difficulty: 'Easy',
      hint: 'Think about frontend and interactivity.',
      question: 'What is JavaScript?',
      answer:
        'JavaScript is a programming language commonly used to make web pages interactive and dynamic.',
    },
    {
      id: 6,
      category: 'Web',
      difficulty: 'Medium',
      hint: 'Think about page structure and browser access.',
      question: 'What is the DOM?',
      answer:
        'DOM stands for Document Object Model. It represents an HTML document as a tree of objects that JavaScript can manipulate.',
    },
  ]

  useEffect(() => {
    const token = localStorage.getItem('prepwise-token')
    const savedUser = localStorage.getItem('prepwise-user')
    const savedProgress = localStorage.getItem('prepwise-progress')

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)

        setUser(parsedUser)
        setAuthenticated(true)
      } catch (error) {
        console.error('Could not read saved user:', error)

        localStorage.removeItem('prepwise-token')
        localStorage.removeItem('prepwise-user')
      }
    }

    if (savedProgress) {
      try {
        setLocalProgress(JSON.parse(savedProgress))
      } catch (error) {
        console.error('Could not read progress:', error)
      }
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(
      'prepwise-progress',
      JSON.stringify(localProgress)
    )
  }, [localProgress])
  useEffect(() => {
    if (!authenticated) return

    const token = localStorage.getItem('prepwise-token')

    if (!token) return

    const fetchDashboard = async () => {
      setDashboardLoading(true)

      try {
        const response = await fetch(
          `${API_URL}/api/dashboard`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Could not load dashboard.'
          )
        }

        setDashboard(data)
        setDashboardError('')

        if (data.user) {
          setUser(data.user)

          localStorage.setItem(
            'prepwise-user',
            JSON.stringify(data.user)
          )
        }
      } catch (error) {
        console.error('Dashboard error:', error)

        setDashboardError(
          error instanceof TypeError
            ? 'Dashboard is temporarily unavailable. Please try again in a moment.'
            : error.message || 'Could not load dashboard.'
        )

        if (
          error.message === 'Invalid or expired token.' ||
          error.message === 'Authentication required.'
        ) {
          localStorage.removeItem('prepwise-token')
          localStorage.removeItem('prepwise-user')

          setUser(null)
          setDashboard(null)
          setAuthenticated(false)
        }
      } finally {
        setDashboardLoading(false)
      }
    }

    fetchDashboard()
  }, [authenticated, API_URL])
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

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
  const fallbackTracks = [
    {
      name: 'JavaScript fundamentals',
      type: 'Technical',
      progress: 72,
      color: 'coral',
      meta: '18 of 25 lessons',
    },
    {
      name: 'System design basics',
      type: 'Technical',
      progress: 38,
      color: 'teal',
      meta: '6 of 16 lessons',
    },
    {
      name: 'Behavioral interviews',
      type: 'Soft skills',
      progress: 84,
      color: 'gold',
      meta: '21 of 25 lessons',
    },
  ]
  const updateForm = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }))
  }
  const submitAuth = async (event) => {
    event.preventDefault()

    setAuthMessage('')
    setAuthLoading(true)

    const email = form.email.trim().toLowerCase()

    const endpoint =
      authMode === 'login'
        ? 'login'
        : 'register'

    try {
      const response = await fetch(
        `${API_URL}/api/auth/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...form,
            email,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Authentication failed.'
        )
      }

      localStorage.setItem(
        'prepwise-token',
        data.token
      )

      localStorage.setItem(
        'prepwise-user',
        JSON.stringify(data.user)
      )

      setUser(data.user)
      setAuthenticated(true)
      setActiveNav('Overview')
      setMockInterview(false)
      setSettingsOpen(false)

      setForm({
        name: '',
        email: '',
        password: '',
      })
    } catch (error) {
      console.error(error)

      setAuthMessage(
        error instanceof TypeError
          ? 'Server se connect nahi ho paya. Backend check karein.'
          : error.message
      )
    } finally {
      setAuthLoading(false)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('prepwise-token')
    localStorage.removeItem('prepwise-user')

    setUser(null)
    setDashboard(null)
    setAuthenticated(false)

    setAuthMode('login')
    setActiveNav('Overview')
    setPracticeMode(false)
    setPracticeQuestion(null)
    setMockInterview(false)
    setSettingsOpen(false)
    setPracticeFinished(false)
    setMockFinished(false)
    setMockCompletedQuestions(0)
    setMockQuestionIndex(0)
    setMockAnswer('')
    setMockSubmitted(false)
    setMockAnswers([])
    setMockResult(null)
    setMockValidation('')
    setDashboardError('')

    setForm({
      name: '',
      email: '',
      password: '',
    })

    setAuthMessage('')
  }
  const startPracticeSession = () => {
    const randomQuestion =
      practiceQuestions[
        Math.floor(
          Math.random() * practiceQuestions.length
        )
      ]

    setPracticeQuestion(randomQuestion)
    setPracticeAnswer('')
    setPracticeResult(null)
    setPracticeScore(0)
    setPracticeTotal(0)
    setPracticeFinished(false)

    setPracticeAnswered(0)

    setPracticeMode(true)
    setMockInterview(false)
    setSettingsOpen(false)
    setActiveNav('Practice')
    setMenuOpen(false)
  }
  const nextPracticeQuestion = () => {
    const randomQuestion = getNextQuestion(
      practiceQuestions,
      practiceQuestion
    )

    setPracticeQuestion(randomQuestion)
    setPracticeAnswer('')
    setPracticeResult(null)
  }
  const submitPracticeAnswer = () => {
    if (!practiceQuestion) return

    if (practiceResult) return

    const evaluation = evaluatePracticeAnswer(
      practiceQuestion,
      practiceAnswer
    )

    const isCorrect = evaluation.correct

    setPracticeResult({
      correct: isCorrect,
      message: evaluation.message,
      suggestion: evaluation.suggestion,
      coverage: evaluation.coverage,
      matchedKeywords: evaluation.matchedKeywords,
    })

    setPracticeTotal(
      (previous) => previous + 1
    )

    setPracticeAnswered(
      (previous) => previous + 1
    )

    setLocalProgress((previous) => ({
      ...previous,
      totalAnswers:
        previous.totalAnswers + 1,
      correctAnswers: isCorrect
        ? previous.correctAnswers + 1
        : previous.correctAnswers,
    }))

    if (isCorrect) {
      setPracticeScore(
        (previous) => previous + 1
      )
    }
  }
  const finishPractice = async () => {
    if (practiceAnswered === 0) {
      setPracticeResult({
        correct: false,
        message:
          'Please answer at least one question before finishing the practice session.',
      })

      return
    }

    setPracticeLoading(true)

    try {
      const token =
        localStorage.getItem(
          'prepwise-token'
        )

      if (token) {
        const response = await fetch(
          `${API_URL}/api/progress/practice`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data =
          await response.json()

        if (response.ok) {
          setDashboard(
            (previous) => ({
              ...(previous || {}),
              weeklyPractice:
                data.weeklyPractice,
              weeklyGoal:
                data.weeklyGoal,
            })
          )
        } else {
          console.error(
            'Practice progress error:',
            data.message
          )
        }
      }
    } catch (error) {
      console.error(
        'Practice progress error:',
        error.message
      )
    } finally {
      setPracticeLoading(false)
    }

    setLocalProgress((previous) => ({
      ...previous,
      completedPractice:
        previous.completedPractice + 1,
    }))

    setPracticeMode(false)
    setPracticeQuestion(null)
    setPracticeAnswer('')
    setPracticeResult(null)
    setPracticeFinished(true)
  }
  const handleNavigation = (label) => {
    setActiveNav(label)
    setMenuOpen(false)

    if (label === 'Practice') {
      startPracticeSession()
      return
    }

    if (label === 'Mock interviews') {
      setPracticeMode(false)
      setMockInterview(true)
      setSettingsOpen(false)
      setMockFinished(false)
      setMockResult(null)
      setMockValidation('')

      setMockQuestionIndex(0)
      setMockAnswer('')
      setMockSubmitted(false)
      setMockCompletedQuestions(0)
      setMockAnswers([])

      return
    }

    if (label === 'My progress') {
      setPracticeMode(false)
      setMockInterview(false)
      setSettingsOpen(false)
      return
    }

    if (label === 'Settings') {
      setPracticeMode(false)
      setMockInterview(false)
      setSettingsOpen(true)
      return
    }

    if (label === 'Overview') {
      setPracticeMode(false)
      setMockInterview(false)
      setSettingsOpen(false)
      setPracticeQuestion(null)
      setPracticeAnswer('')
      setPracticeResult(null)
    }
  }

  const resetMockInterviewSession = () => {
    setMockInterview(true)
    setMockFinished(false)
    setMockQuestionIndex(0)
    setMockAnswer('')
    setMockSubmitted(false)
    setMockCompletedQuestions(0)
    setMockResult(null)
    setMockAnswers([])
    setMockValidation('')
  }

  const submitMockAnswer = () => {
    const trimmedAnswer = mockAnswer.trim()

    if (!trimmedAnswer) {
      setMockValidation(
        'Please write a clear answer before submitting this question.'
      )
      return
    }

    setMockValidation('')

    setMockAnswers((previous) => {
      const nextAnswers = [...previous]
      nextAnswers[mockQuestionIndex] = trimmedAnswer
      return nextAnswers
    })

    setMockSubmitted(true)
    setMockCompletedQuestions(
      (previous) => previous + 1
    )
  }

  const finishMockInterview = () => {
    const summary = summarizeMockInterview(
      mockQuestions,
      mockAnswers
    )

    const latestScore = summary.averageScore || 0

    setMockResult(summary)
    setMockInterview(false)
    setMockFinished(true)

    setLocalProgress((previous) => ({
      ...previous,
      mockInterviews:
        previous.mockInterviews + 1,
      mockInterviewScore: latestScore,
      readiness: Math.min(
        100,
        Math.max(
          Number(previous.readiness || 0),
          latestScore
        )
      ),
    }))

    if (dashboard) {
      setDashboard((previous) => ({
        ...(previous || {}),
        readiness: Math.min(
          100,
          Math.max(
            Number(previous?.readiness || 0),
            latestScore
          )
        ),
      }))
    }
  }

  const userName =
    user?.name || 'User'

  const userEmail =
    user?.email || ''

  const firstName =
    userName.split(' ')[0] || 'User'
  const streak =
    dashboard?.streak ?? 0

  const weeklyPractice =
    dashboard?.weeklyPractice ?? 0

  const weeklyGoal =
    dashboard?.weeklyGoal ?? 220

  const readiness =
    dashboard?.readiness ?? 0

  const tracks =
    dashboard?.tracks?.length
      ? dashboard.tracks.map(
          (track, index) => ({
            ...track,

            color:
              index === 0
                ? 'coral'
                : index === 1
                  ? 'teal'
                  : 'gold',

            meta:
              track.lessons ||
              track.meta ||
              '',
          })
        )
      : fallbackTracks

  const remainingSessions =
    Math.max(
      weeklyGoal -
        weeklyPractice,
      0
    )

  const practicePercentage =
    weeklyGoal > 0
      ? Math.min(
          (weeklyPractice /
            weeklyGoal) *
            100,
          100
        )
      : 0
  const answerAccuracy =
    localProgress.totalAnswers > 0
      ? Math.round(
          (localProgress.correctAnswers /
            localProgress.totalAnswers) *
            100
        )
      : 0

  const overallProgress =
    Math.round(
      (
        (readiness || 0) +
        answerAccuracy +
        Math.min(
          localProgress.completedPractice *
            5,
          100
        ) +
        Math.min(
          localProgress.mockInterviewScore ||
            0,
          100
        )
      ) / 4
    )
  if (!authenticated) {
    return (
      <div className="auth-shell">

        <section className="auth-visual">

          <div className="auth-brand">
            <span className="brand-mark">
              /
            </span>
            Prepwise
          </div>

          <div className="auth-quote">

            <span>“</span>

            <h1>
              Prepare with purpose.
              <br />
              <em>
                Show up ready.
              </em>
            </h1>

            <p>
              Everything you need
              to feel confident in
              your next interview,
              in one focused
              workspace.
            </p>

            <div className="auth-proof">

              <div className="proof-avatars">
                <i>R</i>
                <i>M</i>
                <i>S</i>
              </div>

              <span>
                <strong>
                  12,000+
                </strong>
                candidates preparing
                smarter
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
              <span className="brand-mark">
                /
              </span>
              Prepwise
            </div>

            <div className="auth-heading">

              <p className="eyebrow">
                {authMode === 'login'
                  ? 'WELCOME BACK'
                  : 'GET STARTED'}
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

            <form
              className="auth-form"
              onSubmit={submitAuth}
            >

              {authMode === 'register' && (
                <label>
                  Full name

                  <div className="input-wrap">

                    <UserRound
                      size={17}
                    />

                    <input
                      name="name"
                      value={
                        form.name
                      }
                      onChange={
                        updateForm
                      }
                      placeholder="Your full name"
                      required
                    />

                  </div>
                </label>
              )}

              <label>
                Email address

                <div className="input-wrap">

                  <Mail
                    size={17}
                  />

                  <input
                    name="email"
                    type="email"
                    value={
                      form.email
                    }
                    onChange={
                      updateForm
                    }
                    placeholder="you@example.com"
                    required
                  />

                </div>
              </label>

              <label>
                Password

                <div className="input-wrap">

                  <LockKeyhole
                    size={17}
                  />

                  <input
                    name="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={
                      form.password
                    }
                    onChange={
                      updateForm
                    }
                    placeholder="Enter your password"
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword
                      ? 'Hide'
                      : 'Show'}
                  </button>

                </div>
              </label>

              {authMode === 'login' && (
                <div className="auth-options">

                  <label className="remember">

                    <input
                      type="checkbox"
                    />

                    Remember me

                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setAuthMessage(
                        'Password reset is not connected yet.'
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>
              )}

              {authMessage && (
                <p className="auth-error">
                  {authMessage}
                </p>
              )}

              <button
                className="auth-submit"
                type="submit"
                disabled={
                  authLoading
                }
              >

                {authLoading
                  ? 'Please wait...'
                  : authMode ===
                      'login'
                    ? 'Sign in'
                    : 'Create account'}

                {!authLoading && (
                  <ArrowRight
                    size={16}
                  />
                )}

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

                  setAuthMode(
                    authMode ===
                      'login'
                      ? 'register'
                      : 'login'
                  )

                  setForm({
                    name: '',
                    email: '',
                    password: '',
                  })

                }}
              >

                {authMode === 'login'
                  ? 'Create an account'
                  : 'Sign in'}

              </button>

            </div>

            <p className="auth-terms">
              By continuing, you agree
              to our Terms of Service
              and Privacy Policy.
            </p>

          </div>

        </section>
      </div>
    )
  }
  const Sidebar = () => (
    <aside
      className={`sidebar ${
        menuOpen ? 'is-open' : ''
      }`}
    >

      <div className="brand">

        <span className="brand-mark">
          /
        </span>

        <span>
          Prepwise
        </span>

      </div>

      <div className="workspace-label">
        YOUR WORKSPACE
      </div>

      <nav>

        {navItems.map(
          ({
            label,
            icon: Icon,
          }) => (

            <button
              className={`nav-item ${
                activeNav === label
                  ? 'active'
                  : ''
              }`}
              key={label}
              onClick={() =>
                handleNavigation(
                  label
                )
              }
            >

              <Icon
                size={18}
                strokeWidth={1.8}
              />

              {label}

            </button>

          )
        )}

      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-card">

        <Sparkles
          size={18}
        />

        <strong>
          Interview season?
        </strong>

        <span>
          Build a plan that
          fits your timeline.
        </span>

        <button
          onClick={() =>
            setActiveNav(
              'My progress'
            )
          }
        >
          View your plan
          <ArrowRight
            size={14}
          />
        </button>

      </div>

      <button
        className={`nav-item ${
          settingsOpen ? 'active' : ''
        }`}
        onClick={() => {
          setSettingsOpen(true)
          setPracticeMode(false)
          setMockInterview(false)
          setActiveNav('Settings')
          setMenuOpen(false)
        }}
      >

        <Settings
          size={18}
          strokeWidth={1.8}
        />

        Settings

      </button>

      <div className="profile">

        <div className="avatar">

          {userName
            .split(' ')
            .map(
              (word) =>
                word[0]
            )
            .join('')
            .slice(0, 2)
            .toUpperCase()}

        </div>

        <div>

          <strong>
            {userName}
          </strong>

          <span>
            {userEmail ||
              'Free plan'}
          </span>

        </div>

        <ChevronDown
          size={15}
        />

      </div>

      <button
        className="nav-item"
        onClick={
          handleLogout
        }
        style={{
          marginTop: '8px',
        }}
      >

        <X
          size={18}
          strokeWidth={1.8}
        />

        Sign out

      </button>

    </aside>
  )
  const Topbar = () => (
    <header className="topbar">

      <button
        className="mobile-menu"
        onClick={() =>
          setMenuOpen(
            !menuOpen
          )
        }
        aria-label="Toggle navigation"
      >

        {menuOpen ? (
          <X size={21} />
        ) : (
          <Menu size={21} />
        )}

      </button>

      <div className="crumb">

        {formattedDate}

        <span>
          /
        </span>

        <strong>
          {activeNav}
        </strong>

      </div>

      <div className="top-actions">

        <div className="search-box-wrap">
          <button
            aria-label="Search"
            type="button"
            onClick={() => setSearchOpen((previous) => !previous)}
          >
            <Search
              size={19}
            />
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

          <Bell
            size={19}
          />

          <i />

        </button>

      </div>

    </header>
  )
  if (
    activeNav === 'Practice' &&
    practiceMode &&
    practiceQuestion
  ) {
    return (
      <div className="app-shell">

        <Sidebar />

        <main className="main-content">

          <Topbar />

          <div className="content-wrap">

            <section className="welcome-row">

              <div>

                <p className="eyebrow">
                  PRACTICE SESSION
                </p>

                <h1>
                  Interview practice
                  <span>✦</span>
                </h1>

                <p className="subcopy">
                  Answer the question
                  in your own words
                  and improve your
                  interview skills.
                </p>

              </div>

              <button
                className="outline-btn"
                onClick={
                  finishPractice
                }
                disabled={
                  practiceLoading
                }
              >

                <X size={16} />

                {practiceLoading
                  ? 'Saving...'
                  : 'End session'}

              </button>

            </section>

            <section
              className="panel"
              style={{
                maxWidth:
                  '850px',
                margin:
                  '30px auto',
                padding:
                  '40px',
              }}
            >

              <div
                className="panel-heading"
              >

                <div>

                  <p className="eyebrow">
                    QUESTION {practiceAnswered + 1} OF {practiceQuestions.length}
                  </p>

                  <h2>
                    Technical
                    interview
                  </h2>

                </div>

                {/* STEP 37 - SCORE + ANSWER COUNTER */}

                <div
                  style={{
                    display:
                      'flex',
                    gap:
                      '8px',
                    alignItems:
                      'flex-start',
                  }}
                >

                  <Trophy
                    size={19}
                  />

                  <div>

                    <strong>
                      Score: {practiceScore} / {practiceAnswered}
                    </strong>

                    <div
                      style={{
                        marginTop:
                          '10px',
                        fontSize:
                          '14px',
                        opacity:
                          0.65,
                      }}
                    >
                      {practiceAnswered} question
                      {practiceAnswered === 1
                        ? ''
                        : 's'} answered
                    </div>

                  </div>

                </div>

              </div>

              <div
                style={{
                  marginTop: '18px',
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    background: '#eef2ff',
                    color: '#4338ca',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  {practiceQuestion.category}
                </span>
                <span
                  style={{
                    background: '#ecfeff',
                    color: '#0f766e',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  {practiceQuestion.difficulty || 'Medium'}
                </span>
                <span
                  style={{
                    background: '#fff7ed',
                    color: '#c2410c',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  Tip: {practiceQuestion.hint}
                </span>
              </div>

              <div
                style={{
                  marginTop: '30px',
                }}
              >
                <h2
                  style={{
                    fontSize: '26px',
                    lineHeight: '1.4',
                  }}
                >
                  {practiceQuestion.question}
                </h2>
              </div>

              <textarea
                value={
                  practiceAnswer
                }
                onChange={(event) =>
                  setPracticeAnswer(
                    event.target.value
                  )
                }
                placeholder="Write your answer here..."
                rows={7}
                disabled={
                  practiceResult !==
                  null
                }
                style={{
                  width:
                    '100%',
                  marginTop:
                    '25px',
                  padding:
                    '18px',
                  border:
                    '1px solid #ddd',
                  borderRadius:
                    '12px',
                  resize:
                    'vertical',
                  fontSize:
                    '16px',
                  fontFamily:
                    'inherit',
                  boxSizing:
                    'border-box',
                }}
              />

              {!practiceResult && (

                <button
                  className="primary-btn"
                  onClick={
                    submitPracticeAnswer
                  }
                  style={{
                    marginTop:
                      '20px',
                  }}
                >

                  <Check
                    size={17}
                  />

                  Submit answer

                </button>

              )}

              {practiceResult && (

                <div
                  style={{
                    marginTop:
                      '25px',
                    padding:
                      '20px',
                    borderRadius:
                      '12px',
                    background:
                      practiceResult.correct
                        ? '#edf9f1'
                        : '#fff6e8',
                    border:
                      practiceResult.correct
                        ? '1px solid #b7e4c7'
                        : '1px solid #f1d29b',
                  }}
                >

                  <strong>
                    {practiceResult.correct
                      ? '✓ Correct!'
                      : 'Keep practicing'}
                  </strong>

                  <p>
                    {
                      practiceResult.message
                    }
                  </p>

                  <div
                    style={{
                      marginTop: '15px',
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        background: '#f1f5f9',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Key ideas matched: {practiceResult.matchedKeywords?.length || 0}
                    </span>
                    <span
                      style={{
                        background: '#f1f5f9',
                        padding: '6px 10px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Coverage: {Math.round((practiceResult.coverage || 0) * 100)}%
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: '15px',
                    }}
                  >
                    <strong>
                      Expected answer:
                    </strong>

                    <p>
                      {practiceQuestion.answer}
                    </p>
                  </div>

                  {practiceResult.suggestion && (
                    <div
                      style={{
                        marginTop: '12px',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.45)',
                      }}
                    >
                      <strong>Improvement tip:</strong>
                      <p style={{ margin: '6px 0 0' }}>
                        {practiceResult.suggestion}
                      </p>
                    </div>
                  )}

                </div>
              )}

              {practiceResult && (
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '20px',
                    flexWrap: 'wrap',
                  }}
                >

                  <button
                    className="primary-btn"
                    onClick={
                      nextPracticeQuestion
                    }
                  >

                    <RotateCcw
                      size={16}
                    />

                    Next question

                  </button>

                  <button
                    className="outline-btn"
                    onClick={
                      finishPractice
                    }
                    disabled={
                      practiceLoading
                    }
                  >

                    {practiceLoading
                      ? 'Saving...'
                      : 'Finish practice'}

                    <ArrowRight
                      size={15}
                    />

                  </button>

                </div>

              )}

            </section>

          </div>

        </main>

      </div>
    )
  }
  if (
    activeNav === 'Mock interviews' &&
    mockInterview
  ) {
    return (
      <div className="app-shell">

        <Sidebar />

        <main className="main-content">

          <Topbar />

          <div className="content-wrap">

            <section className="welcome-row">

              <div>

                <p className="eyebrow">
                  MOCK INTERVIEWS
                </p>

                <h1>
                  Get interview-ready
                  <span>✦</span>
                </h1>

                <p className="subcopy">
                  Practice realistic
                  interview conversations
                  before the real interview.
                </p>

              </div>

              <button
                className="outline-btn"
                onClick={() => {
                  setMockInterview(false)
                  setActiveNav('Overview')
                }}
              >

                <ArrowRight
                  size={15}
                />

                Back to overview

              </button>

            </section>

            <section
              className="panel"
              style={{
                maxWidth:
                  '850px',
                margin:
                  '30px auto',
                padding:
                  '40px',
              }}
            >

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    UPCOMING SESSION
                  </p>

                  <h2>
                    Frontend Engineer
                  </h2>

                </div>

                <CalendarDays
                  size={22}
                />

              </div>

              <div
                style={{
                  marginTop:
                    '30px',
                  padding:
                    '25px',
                  borderRadius:
                    '14px',
                  background:
                    '#f8f6f1',
                }}
              >

                <h3>
                  24 September 2026
                </h3>

                <p>
                  Technical round ·
                  45 minutes
                </p>

                <p>
                  Scheduled with Maya Chen
                </p>

              </div>

              <div
                style={{
                  marginTop:
                    '25px',
                  display:
                    'flex',
                  gap:
                    '12px',
                  flexWrap:
                    'wrap',
                }}
              >

                <button
                  className="primary-btn"
                  onClick={() => {
                    setMockInterview(false)
                    startPracticeSession()
                  }}
                >

                  <Play
                    size={16}
                    fill="currentColor"
                  />

                  Practice before interview

                </button>

                <button
                  className="outline-btn"
                  onClick={() => {
                    setMockInterview(false)
                    setActiveNav('Overview')
                  }}
                >
                  Close
                </button>

              </div>

              <div
                style={{
                  marginTop: '30px',
                  padding: '25px',
                  borderRadius: '14px',
                  background: '#f8f6f1',
                }}
              >
                <p className="eyebrow">
                  INTERVIEW QUESTION
                </p>

                <p
                  className="muted"
                  style={{
                    marginTop: '8px',
                  }}
                >
                  Question {mockQuestionIndex + 1} of{' '}
                  {mockQuestions.length}
                </p>

                <h3
                  style={{
                    fontSize: '22px',
                    lineHeight: '1.5',
                    marginTop: '10px',
                  }}
                >
                  {mockQuestion}
                </h3>

                {mockValidation && (
                  <div className="state-banner error" style={{ marginTop: '16px' }}>
                    {mockValidation}
                  </div>
                )}

                <textarea
                  value={mockAnswer}
                  onChange={(event) => {
                    setMockAnswer(event.target.value)
                    if (mockValidation) setMockValidation('')
                  }}
                  placeholder="Type your answer here..."
                  rows={6}
                  disabled={mockSubmitted}
                  style={{
                    width: '100%',
                    marginTop: '20px',
                    padding: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    resize: 'vertical',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />

                {!mockSubmitted ? (
                  <button
                    className="primary-btn"
                    style={{
                      marginTop: '15px',
                    }}
                    onClick={submitMockAnswer}
                  >
                    <Check size={16} />
                    Submit answer
                  </button>
                ) : (
                  <div
                    style={{
                      marginTop: '20px',
                      padding: '18px',
                      borderRadius: '12px',
                      background: '#edf9f1',
                      border: '1px solid #b7e4c7',
                    }}
                  >
                    <strong>
                      ✓ Answer submitted
                    </strong>

                    <p>
                      Your mock interview response has been
                      recorded for this session.
                    </p>
                  </div>
                )}

                {mockSubmitted && (
                  <div
                    style={{
                      marginTop: '15px',
                      display: 'flex',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      className="outline-btn"
                      onClick={() => {
                        setMockAnswer('')
                        setMockSubmitted(false)
                      }}
                    >
                      <RotateCcw size={16} />
                      Try again
                    </button>

                    {mockQuestionIndex <
                    mockQuestions.length - 1 ? (
                      <button
                        className="primary-btn"
                        onClick={() => {
                          setMockQuestionIndex(
                            (previous) => previous + 1
                          )

                          setMockAnswer('')
                          setMockSubmitted(false)
                        }}
                      >
                        Next question
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        className="primary-btn"
                        onClick={finishMockInterview}
                      >
                        Finish interview
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>

            </section>

          </div>

        </main>

      </div>
    )
  }

  if (mockFinished) {
    const summary =
      mockResult ||
      summarizeMockInterview(
        mockQuestions,
        mockAnswers
      )

    const completionPercentage =
      summary?.completion ?? 0

    const scorePercentage =
      summary?.averageScore ?? 0

    return (
      <div className="app-shell">

        <Sidebar />

        <main className="main-content">

          <Topbar />

          <div className="content-wrap">

            <section className="welcome-row">

              <div>

                <p className="eyebrow">
                  INTERVIEW COMPLETE
                </p>

                <h1>
                  Mock interview complete
                  <span>✦</span>
                </h1>

                <p className="subcopy">
                  You completed your mock
                  interview session. Keep
                  practicing to improve your
                  confidence.
                </p>

              </div>

              <button
                className="outline-btn"
                onClick={() => {
                  setMockFinished(false)
                  setMockResult(null)
                  setActiveNav('Overview')
                  setMockQuestionIndex(0)
                  setMockAnswer('')
                  setMockSubmitted(false)
                  setMockCompletedQuestions(0)
                  setMockAnswers([])
                }}
              >
                <ArrowRight size={15} />
                Back to overview
              </button>

            </section>

            <section className="stats-grid">

              <div className="stat-card dark">

                <div className="stat-icon">
                  <Check size={19} />
                </div>

                <span>
                  Questions completed
                </span>

                <strong>
                  {mockCompletedQuestions}
                  <small>
                    {' '}
                    / {mockQuestions.length}
                  </small>
                </strong>

              </div>

              <div className="stat-card">

                <div className="stat-icon teal-icon">
                  <Target size={19} />
                </div>

                <span>
                  Interview score
                </span>

                <strong>
                  {scorePercentage}
                  <small>%</small>
                </strong>

                <div className="progress-line">

                  <i
                    style={{
                      width:
                        `${scorePercentage}%`,
                    }}
                  />

                </div>

              </div>

              <div className="stat-card">

                <div className="stat-icon gold-icon">
                  <Trophy size={19} />
                </div>

                <span>
                  Interview sessions
                </span>

                <strong>
                  {localProgress.mockInterviews}
                </strong>

                <small className="muted">
                  Completed mock interviews
                </small>

              </div>

            </section>

            <section
              className="panel"
              style={{
                maxWidth: '850px',
                margin: '30px auto',
                padding: '40px',
              }}
            >

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    SESSION SUMMARY
                  </p>

                  <h2>
                    Your interview session
                  </h2>

                </div>

                <Award size={22} />

              </div>

              <div
                style={{
                  marginTop: '30px',
                  padding: '25px',
                  borderRadius: '14px',
                  background: '#f8f6f1',
                }}
              >

                <h3>
                  Frontend Engineer
                </h3>

                <p>
                  Technical mock interview
                </p>

                <p>
                  Questions completed:{' '}
                  <strong>
                    {summary?.answeredCount || mockCompletedQuestions}
                  </strong>
                </p>

                <p>
                  Completion:{' '}
                  <strong>
                    {completionPercentage}%
                  </strong>
                </p>

                <p>
                  Interview score:{' '}
                  <strong>
                    {scorePercentage}%
                  </strong>
                </p>

                <p>
                  Strong answers:{' '}
                  <strong>
                    {summary?.strongAnswers ?? 0}
                  </strong>
                </p>

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
                    setMockFinished(false)
                    setMockResult(null)
                    setMockQuestionIndex(0)
                    setMockAnswer('')
                    setMockSubmitted(false)
                    setMockCompletedQuestions(0)
                    setMockInterview(true)
                    setActiveNav('Mock interviews')
                  }}
                >

                  <RotateCcw size={16} />

                  Start again

                </button>

                <button
                  className="outline-btn"
                  onClick={() => {
                    setMockFinished(false)
                    setMockResult(null)
                    setActiveNav('My progress')
                  }}
                >

                  <BarChart3 size={16} />

                  View my progress

                </button>

              </div>

            </section>

          </div>

        </main>

      </div>
    )
  }
  if (
    activeNav === 'My progress'
  ) {
    return (
      <div className="app-shell">

        <Sidebar />

        <main className="main-content">

          <Topbar />

          <div className="content-wrap">

            <section className="welcome-row">

              <div>

                <p className="eyebrow">
                  YOUR PROGRESS
                </p>

                <h1>
                  Track your progress
                  <span>✦</span>
                </h1>

                <p className="subcopy">
                  See your learning
                  activity and interview
                  preparation progress.
                </p>

              </div>

              <button
                className="primary-btn"
                onClick={
                  startPracticeSession
                }
              >

                <Play
                  size={16}
                  fill="currentColor"
                />

                Practice now

              </button>

            </section>

            <section className="stats-grid">

              <div className="stat-card dark">

                <div className="stat-icon">
                  <Trophy size={19} />
                </div>

                <span>
                  Overall progress
                </span>

                <strong>
                  {overallProgress}
                  <small>%</small>
                </strong>

                <div className="progress-line">
                  <i
                    style={{
                      width:
                        `${Math.min(
                          overallProgress,
                          100
                        )}%`,
                    }}
                  />
                </div>

                <small className="muted">
                  Keep learning consistently
                </small>

              </div>

              <div className="stat-card">

                <div className="stat-icon teal-icon">
                  <BookOpen size={19} />
                </div>

                <span>
                  Practice sessions
                </span>

                <strong>
                  {
                    localProgress.completedPractice
                  }
                </strong>

                <small className="muted">
                  Completed sessions
                </small>

              </div>

              <div className="stat-card">

                <div className="stat-icon gold-icon">
                  <Target size={19} />
                </div>

                <span>
                  Answer accuracy
                </span>

                <strong>
                  {answerAccuracy}
                  <small>%</small>
                </strong>

                <div className="progress-line gold-line">
                  <i
                    style={{
                      width:
                        `${answerAccuracy}%`,
                    }}
                  />
                </div>

                <small className="muted">
                  Based on practice answers
                </small>

              </div>

            </section>

            <section className="main-grid">

              <div className="panel">

                <div className="panel-heading">

                  <div>

                    <p className="eyebrow">
                      LEARNING PROGRESS
                    </p>

                    <h2>
                      Skill tracks
                    </h2>

                  </div>

                  <BarChart3
                    size={20}
                  />

                </div>

                {tracks.map(
                  (track) => (

                    <div
                      className="track"
                      key={
                        track.name
                      }
                    >

                      <div
                        className={`track-icon ${track.color}`}
                      >

                        {track.color ===
                        'coral' ? (
                          <BriefcaseBusiness
                            size={18}
                          />
                        ) : track.color ===
                          'teal' ? (
                          <BookOpen
                            size={18}
                          />
                        ) : (
                          <Users
                            size={18}
                          />
                        )}

                      </div>

                      <div className="track-info">

                        <div className="track-top">

                          <strong>
                            {
                              track.name
                            }
                          </strong>

                          <span>
                            {
                              track.progress
                            }%
                          </span>

                        </div>

                        <div className="track-bar">

                          <i
                            className={
                              track.color
                            }
                            style={{
                              width:
                                `${track.progress}%`,
                            }}
                          />

                        </div>

                        <small>
                          {
                            track.type
                          }
                          <b>
                            {' '}
                            ·{' '}
                          </b>
                          {
                            track.meta
                          }
                        </small>

                      </div>

                    </div>

                  )
                )}

              </div>

              <div className="panel">

                <div className="panel-heading">

                  <div>

                    <p className="eyebrow">
                      WEEKLY ACTIVITY
                    </p>

                    <h2>
                      Practice goal
                    </h2>

                  </div>

                  <Target
                    size={20}
                  />

                </div>

                <div
                  style={{
                    marginTop:
                      '30px',
                    textAlign:
                      'center',
                  }}
                >

                  <div
                    style={{
                      fontSize:
                        '48px',
                      fontWeight:
                        '700',
                    }}
                  >
                    {
                      weeklyPractice
                    }

                    <span
                      style={{
                        fontSize:
                          '22px',
                        opacity:
                          0.5,
                      }}
                    >
                      {' '}
                      / {weeklyGoal}
                    </span>

                  </div>

                  <p>
                    practice sessions
                    this week
                  </p>

                  <div
                    className="progress-line"
                    style={{
                      marginTop:
                        '25px',
                    }}
                  >

                    <i
                      style={{
                        width:
                          `${practicePercentage}%`,
                      }}
                    />

                  </div>

                  <p
                    style={{
                      marginTop:
                        '15px',
                    }}
                  >
                    {remainingSessions === 0
                      ? 'Weekly goal completed!'
                      : `${remainingSessions} sessions remaining`}
                  </p>

                </div>

              </div>

            </section>

            <section
              className="panel"
              style={{
                marginTop:
                  '24px',
              }}
            >

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    ACHIEVEMENTS
                  </p>

                  <h2>
                    Your milestones
                  </h2>

                </div>

                <Award size={20} />

              </div>

              <div
                style={{
                  display:
                    'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(180px, 1fr))',
                  gap:
                    '16px',
                  marginTop:
                    '25px',
                }}
              >

                <div
                  style={{
                    padding:
                      '20px',
                    border:
                      '1px solid #e5e1d8',
                    borderRadius:
                      '14px',
                  }}
                >

                  <Trophy
                    size={22}
                  />

                  <h3>
                    First Practice
                  </h3>

                  <p>
                    Complete your first
                    practice session.
                  </p>

                  <strong>
                    {localProgress.completedPractice >=
                    1
                      ? '✓ Completed'
                      : 'Not completed'}
                  </strong>

                </div>

                <div
                  style={{
                    padding:
                      '20px',
                    border:
                      '1px solid #e5e1d8',
                    borderRadius:
                      '14px',
                  }}
                >

                  <Target
                    size={22}
                  />

                  <h3>
                    Accuracy
                  </h3>

                  <p>
                    Get at least 70%
                    answer accuracy.
                  </p>

                  <strong>
                    {answerAccuracy >= 70
                      ? '✓ Completed'
                      : 'Keep practicing'}
                  </strong>

                </div>

                <div
                  style={{
                    padding:
                      '20px',
                    border:
                      '1px solid #e5e1d8',
                    borderRadius:
                      '14px',
                  }}
                >

                  <Flame
                    size={22}
                  />

                  <h3>
                    Consistency
                  </h3>

                  <p>
                    Continue practicing
                    every week.
                  </p>

                  <strong>
                    {streak > 0
                      ? '✓ Active'
                      : 'Start today'}
                  </strong>

                </div>

              </div>

            </section>

          </div>

        </main>

      </div>
    )
  }
  if (practiceFinished) {
    const percentage =
      practiceAnswered > 0
        ? Math.round(
            (practiceScore / practiceAnswered) * 100
          )
        : 0

    return (
      <div className="app-shell">

        <Sidebar />

        <main className="main-content">

          <Topbar />

          <div className="content-wrap">

            <section
              className="panel"
              style={{
                maxWidth: '700px',
                margin: '50px auto',
                padding: '45px',
                textAlign: 'center',
              }}
            >

              <Trophy
                size={48}
                style={{
                  marginBottom: '20px',
                }}
              />

              <p className="eyebrow">
                PRACTICE COMPLETE
              </p>

              <h1>
                Great work!
                <span>✦</span>
              </h1>

              <p className="subcopy">
                You completed your practice session.
              </p>

              <div
                style={{
                  marginTop: '30px',
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(3, 1fr)',
                  gap: '15px',
                }}
              >

                <div className="stat-card">

                  <span>
                    Score
                  </span>

                  <strong>
                    {practiceScore}
                    <small>
                      {' '}
                      / {practiceAnswered}
                    </small>
                  </strong>

                </div>

                <div className="stat-card">

                  <span>
                    Accuracy
                  </span>

                  <strong>
                    {percentage}
                    <small>%</small>
                  </strong>

                </div>

                <div className="stat-card">

                  <span>
                    Questions
                  </span>

                  <strong>
                    {practiceAnswered}
                  </strong>

                </div>

              </div>

              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >

                <button
                  className="primary-btn"
                  onClick={() => {
                    setPracticeFinished(false)
                    startPracticeSession()
                  }}
                >

                  <RotateCcw size={16} />

                  Practice again

                </button>

                <button
                  className="outline-btn"
                  onClick={() => {
                    setPracticeFinished(false)
                    setPracticeScore(0)
                    setPracticeTotal(0)
                    setPracticeAnswered(0)
                    setActiveNav('Overview')
                  }}
                >

                  <ArrowRight size={15} />

                  Back to overview

                </button>

              </div>

            </section>

          </div>

        </main>

      </div>
    )
  }
  if (settingsOpen) {
    return (
      <div className="app-shell">

        <Sidebar />

        <main className="main-content">

          <Topbar />

          <div className="content-wrap">

            <section className="welcome-row">

              <div>

                <p className="eyebrow">
                  ACCOUNT SETTINGS
                </p>

                <h1>
                  Settings
                  <span>✦</span>
                </h1>

                <p className="subcopy">
                  Manage your account information
                  and preferences.
                </p>

              </div>

              <button
                className="outline-btn"
                onClick={() => {
                  setSettingsOpen(false)
                  setActiveNav('Overview')
                }}
              >

                <ArrowRight size={15} />

                Back to overview

              </button>

            </section>

            <section className="panel">

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    PROFILE
                  </p>

                  <h2>
                    Your account
                  </h2>

                </div>

                <UserRound size={20} />

              </div>

              <div
                style={{
                  marginTop:
                    '30px',
                  display:
                    'grid',
                  gap:
                    '20px',
                }}
              >

                <div>

                  <small className="muted">
                    Full name
                  </small>

                  <h3>
                    {userName}
                  </h3>

                </div>

                <div>

                  <small className="muted">
                    Email address
                  </small>

                  <h3>
                    {userEmail}
                  </h3>

                </div>

                <div>

                  <small className="muted">
                    Account status
                  </small>

                  <h3>
                    Active
                  </h3>

                </div>

              </div>

              <div
                style={{
                  marginTop:
                    '30px',
                  display:
                    'flex',
                  gap:
                    '12px',
                  flexWrap:
                    'wrap',
                }}
              >

                <button
                  className="primary-btn"
                  onClick={() => {
                    setSettingsOpen(false)
                    setActiveNav('Overview')
                  }}
                >

                  <Check size={16} />

                  Done

                </button>

                <button
                  className="outline-btn"
                  onClick={
                    handleLogout
                  }
                >

                  <X size={16} />

                  Sign out

                </button>

              </div>

            </section>

          </div>

        </main>

      </div>
    )
  }
  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <div className="content-wrap">

          {dashboardLoading && (
            <div
              className="state-banner info"
              style={{
                marginBottom: '18px',
              }}
            >
              Loading dashboard...
            </div>
          )}

          {dashboardError && !dashboardLoading && (
            <div
              className="state-banner error"
              style={{
                marginBottom: '18px',
              }}
            >
              {dashboardError}
            </div>
          )}

          {/* WELCOME */}

          <section className="welcome-row">

            <div>

              <p className="eyebrow">
                KEEP THE MOMENTUM
              </p>

              <h1>
                Good morning,
                {' '}
                {firstName}
                <span>
                  ✦
                </span>
              </h1>

              <p className="subcopy">
                A little progress
                today makes
                interview day
                feel easy.
              </p>

            </div>

            <button
              className="primary-btn"
              onClick={
                startPracticeSession
              }
            >

              <Play
                size={16}
                fill="currentColor"
              />

              Start a practice
              session

            </button>

          </section>

          {/* STATS */}

          <section className="stats-grid">

            <div className="stat-card dark">

              <div className="stat-icon">

                <Flame
                  size={19}
                />

              </div>

              <span>
                Current streak
              </span>

              <strong>

                {streak}

                <small>
                  {' '}
                  days
                </small>

              </strong>

              <div className="mini-bars">

                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />

              </div>

              <small className="muted">
                Keep practicing
                every day
              </small>

            </div>

            <div className="stat-card">

              <div className="stat-icon teal-icon">

                <Target
                  size={19}
                />

              </div>

              <span>
                Practice this week
              </span>

              <strong>

                {weeklyPractice}

                <small>
                  {' '}
                  / {weeklyGoal}
                </small>

              </strong>

              <div className="progress-line">

                <i
                  style={{
                    width:
                      `${practicePercentage}%`,
                  }}
                />

              </div>

              <small className="muted">

                {remainingSessions ===
                0
                  ? 'Weekly goal completed!'
                  : `${remainingSessions} sessions to go`}

              </small>

            </div>

            <div className="stat-card">

              <div className="stat-icon gold-icon">

                <Trophy
                  size={19}
                />

              </div>

              <span>
                Readiness score
              </span>

              <strong>

                {readiness}

                <small>
                  {' '}
                  %
                </small>

              </strong>

              <div className="progress-line gold-line">

                <i
                  style={{
                    width:
                      `${readiness}%`,
                  }}
                />

              </div>

              <small className="muted">
                Your current
                preparation level
              </small>

            </div>

          </section>

          {/* MAIN GRID */}

          <section className="main-grid">

            <div className="panel tracks-panel">

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    YOUR LEARNING PATH
                  </p>

                  <h2>
                    Skill tracks
                  </h2>

                </div>

                <button
                  className="text-btn"
                  onClick={() =>
                    handleNavigation(
                      'My progress'
                    )
                  }
                >

                  View all

                  <ArrowRight
                    size={15}
                  />

                </button>

              </div>

              {tracks.map(
                (track) => (

                  <div
                    className="track"
                    key={
                      track.name
                    }
                  >

                    <div
                      className={`track-icon ${track.color}`}
                    >

                      {track.color ===
                      'coral' ? (
                        <BriefcaseBusiness
                          size={18}
                        />
                      ) : track.color ===
                        'teal' ? (
                        <BookOpen
                          size={18}
                        />
                      ) : (
                        <Users
                          size={18}
                        />
                      )}

                    </div>

                    <div className="track-info">

                      <div className="track-top">

                        <strong>
                          {
                            track.name
                          }
                        </strong>

                        <span>
                          {
                            track.progress
                          }%
                        </span>

                      </div>

                      <div className="track-bar">

                        <i
                          className={
                            track.color
                          }
                          style={{
                            width:
                              `${track.progress}%`,
                          }}
                        />

                      </div>

                      <small>

                        {
                          track.type
                        }

                        <b>
                          {' '}
                          ·{' '}
                        </b>

                        {
                          track.meta
                        }

                      </small>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* MOCK INTERVIEW */}

            <div className="panel calendar-panel">

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    UP NEXT
                  </p>

                  <h2>
                    Mock interview
                  </h2>

                </div>

                <CalendarDays
                  size={20}
                  className="calendar-icon"
                />

              </div>

              <div className="interview-date">

                <strong>
                  24
                </strong>

                <span>
                  SEP
                  <br />
                  <b>
                    2026
                  </b>
                </span>

                <div>

                  <strong>
                    Frontend Engineer
                  </strong>

                  <small>
                    Technical round ·
                    45 min
                  </small>

                </div>

              </div>

              <div className="interview-footer">

                <span>

                  <i className="online-dot" />

                  Scheduled with
                  Maya Chen

                </span>

                <button
                  aria-label="Open mock interview"
                  onClick={() =>
                    handleNavigation(
                      'Mock interviews'
                    )
                  }
                >

                  <ArrowRight
                    size={17}
                  />

                </button>

              </div>

            </div>

          </section>

          {/* BOTTOM GRID */}

          <section className="bottom-grid">

            <div className="panel question-panel">

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    DAILY CHALLENGE
                  </p>

                  <h2>
                    Question of the
                    day
                  </h2>

                </div>

                <span className="difficulty">
                  MEDIUM
                </span>

              </div>

              <p className="question">

                What is the
                difference between
                {' '}
                <code>
                  ==
                </code>
                {' '}
                and
                {' '}
                <code>
                  ===
                </code>
                {' '}
                in JavaScript?

              </p>

              {answerShown ? (

                <div className="answer">

                  <Check
                    size={16}
                  />

                  <span>

                    <strong>
                      Correct.
                    </strong>

                    {' '}

                    <code>
                      ===
                    </code>

                    {' '}
                    checks value
                    and type, while
                    {' '}

                    <code>
                      ==
                    </code>

                    {' '}
                    allows type
                    coercion.

                  </span>

                </div>

              ) : (

                <button
                  className="outline-btn"
                  onClick={() =>
                    setAnswerShown(
                      true
                    )
                  }
                >

                  Reveal answer

                  <ArrowRight
                    size={15}
                  />

                </button>

              )}

            </div>

            <div className="panel activity-panel">

              <div className="panel-heading">

                <div>

                  <p className="eyebrow">
                    RECENT ACTIVITY
                  </p>

                  <h2>
                    Nice work this week
                  </h2>

                </div>

                <button
                  className="icon-btn"
                  aria-label="View activity"
                  onClick={() =>
                    handleNavigation(
                      'My progress'
                    )
                  }
                >

                  <ArrowRight
                    size={17}
                  />

                </button>

              </div>

              <div className="activity-row">

                <div className="activity-icon coral">

                  <Check
                    size={17}
                  />

                </div>

                <div>

                  <strong>
                    JavaScript
                    fundamentals
                  </strong>

                  <span>
                    Completed lesson
                    18
                  </span>

                </div>

                <time>
                  2h ago
                </time>

              </div>

              <div className="activity-row">

                <div className="activity-icon teal">

                  <Play
                    size={15}
                    fill="currentColor"
                  />

                </div>

                <div>

                  <strong>
                    Behavioral practice
                  </strong>

                  <span>
                    Scored 86% on
                    session
                  </span>

                </div>

                <time>
                  Yesterday
                </time>

              </div>

              <div className="activity-row">

                <div className="activity-icon gold">

                  <Trophy
                    size={17}
                  />

                </div>

                <div>

                  <strong>
                    Progress updated
                  </strong>

                  <span>
                    Keep building your
                    interview skills
                  </span>

                </div>

                <time>
                  Today
                </time>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  )
}

export default App