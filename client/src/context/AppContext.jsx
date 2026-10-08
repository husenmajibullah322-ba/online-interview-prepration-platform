import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { practiceQuestions, mockQuestions, fallbackTracks } from '../data/mockData'
import {
  evaluatePracticeAnswer,
  getNextQuestion,
  summarizeMockInterview,
} from '../utils/practiceSession'

const AppContext = createContext(null)

export async function readApiResponse(response) {
  const body = await response.text()

  try {
    return JSON.parse(body)
  } catch {
    throw new Error(
      `The API returned an invalid response (HTTP ${response.status}). Check that the backend is running.`
    )
  }
}

export function AppProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [authenticated, setAuthenticated] = useState(() => {
    try {
      const token = localStorage.getItem('prepwise-token')
      const savedUser = localStorage.getItem('prepwise-user')
      return Boolean(token && savedUser)
    } catch {
      return false
    }
  })

  const [authMode, setAuthMode] = useState(() => {
    return window.location.pathname.includes('/signup') ||
      window.location.pathname.includes('/register')
      ? 'register'
      : 'login'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('prepwise-user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

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
  const [practiceQuestion, setPracticeQuestion] = useState(
    () => practiceQuestions[0]
  )
  const [practiceAnswer, setPracticeAnswer] = useState('')
  const [practiceResult, setPracticeResult] = useState(null)
  const [practiceLoading, setPracticeLoading] = useState(false)
  const [practiceScore, setPracticeScore] = useState(0)
  const [practiceTotal, setPracticeTotal] = useState(0)
  const [practiceFinished, setPracticeFinished] = useState(false)
  const [practiceAnswered, setPracticeAnswered] = useState(0)

  const [mockInterview, setMockInterview] = useState(false)
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0)
  const [mockAnswer, setMockAnswer] = useState('')
  const [mockSubmitted, setMockSubmitted] = useState(false)
  const [mockFinished, setMockFinished] = useState(false)
  const [mockCompletedQuestions, setMockCompletedQuestions] = useState(0)
  const [mockAnswers, setMockAnswers] = useState([])
  const [mockResult, setMockResult] = useState(null)
  const [mockValidation, setMockValidation] = useState('')

  const mockQuestion = mockQuestions[mockQuestionIndex]

  const [localProgress, setLocalProgress] = useState(() => {
    try {
      const savedProgress = localStorage.getItem('prepwise-progress')
      return savedProgress
        ? JSON.parse(savedProgress)
        : {
            completedPractice: 0,
            correctAnswers: 0,
            totalAnswers: 0,
            mockInterviews: 0,
            mockInterviewScore: 0,
          }
    } catch {
      return {
        completedPractice: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        mockInterviews: 0,
        mockInterviewScore: 0,
      }
    }
  })

  const API_URL = import.meta.env.VITE_API_URL || ''

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
    localStorage.setItem('prepwise-progress', JSON.stringify(localProgress))
  }, [localProgress])

  useEffect(() => {
    if (!authenticated) return

    const token = localStorage.getItem('prepwise-token')
    if (!token) return

    const fetchDashboard = async () => {
      setDashboardLoading(true)

      try {
        const response = await fetch(`${API_URL}/api/dashboard`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await readApiResponse(response)

        if (!response.ok) {
          throw new Error(data.message || 'Could not load dashboard.')
        }

        setDashboard(data)
        setDashboardError('')

        if (data.user) {
          setUser(data.user)
          localStorage.setItem('prepwise-user', JSON.stringify(data.user))
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
          navigate('/login')
        }
      } finally {
        setDashboardLoading(false)
      }
    }

    fetchDashboard()
  }, [authenticated, API_URL, navigate])

  useEffect(() => {
    const path = location.pathname
    if (path === '/login') {
      setAuthMode('login')
      setSettingsOpen(false)
    } else if (path === '/signup' || path === '/register') {
      setAuthMode('register')
      setSettingsOpen(false)
    } else if (path === '/dashboard') {
      setActiveNav('Overview')
      setSettingsOpen(false)
      setPracticeMode(false)
      setMockInterview(false)
    } else if (path === '/practice') {
      setActiveNav('Practice')
      setSettingsOpen(false)
      setMockInterview(false)
      setPracticeMode(true)
      if (!practiceQuestion && !practiceFinished) {
        const randomQuestion =
          practiceQuestions[
            Math.floor(Math.random() * practiceQuestions.length)
          ]
        setPracticeQuestion(randomQuestion)
      }
    } else if (path === '/mock-interviews') {
      setActiveNav('Mock interviews')
      setSettingsOpen(false)
      setPracticeMode(false)
      setMockInterview(true)
    } else if (path === '/progress') {
      setActiveNav('My progress')
      setSettingsOpen(false)
      setPracticeMode(false)
      setMockInterview(false)
    } else if (path === '/settings') {
      setActiveNav('Settings')
      setSettingsOpen(true)
      setPracticeMode(false)
      setMockInterview(false)
    }
  }, [location.pathname, practiceFinished, practiceQuestion])

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

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
    const endpoint = authMode === 'login' ? 'login' : 'register'

    try {
      const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          email,
        }),
      })

      const data = await readApiResponse(response)

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed.')
      }

      localStorage.setItem('prepwise-token', data.token)
      localStorage.setItem('prepwise-user', JSON.stringify(data.user))

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
      navigate('/dashboard')
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
    navigate('/login')
  }

  const startPracticeSession = () => {
    const randomQuestion =
      practiceQuestions[
        Math.floor(Math.random() * practiceQuestions.length)
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

    setPracticeTotal((previous) => previous + 1)
    setPracticeAnswered((previous) => previous + 1)

    setLocalProgress((previous) => ({
      ...previous,
      totalAnswers: previous.totalAnswers + 1,
      correctAnswers: isCorrect
        ? previous.correctAnswers + 1
        : previous.correctAnswers,
    }))

    if (isCorrect) {
      setPracticeScore((previous) => previous + 1)
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
      const token = localStorage.getItem('prepwise-token')

      if (token) {
        const response = await fetch(`${API_URL}/api/progress/practice`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await readApiResponse(response)

        if (response.ok) {
          setDashboard((previous) => ({
            ...(previous || {}),
            weeklyPractice: data.weeklyPractice,
            weeklyGoal: data.weeklyGoal,
          }))
        } else {
          console.error('Practice progress error:', data.message)
        }
      }
    } catch (error) {
      console.error('Practice progress error:', error.message)
    } finally {
      setPracticeLoading(false)
    }

    setLocalProgress((previous) => ({
      ...previous,
      completedPractice: previous.completedPractice + 1,
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
      navigate('/practice')
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
      navigate('/mock-interviews')
      return
    }

    if (label === 'My progress') {
      setPracticeMode(false)
      setMockInterview(false)
      setSettingsOpen(false)
      navigate('/progress')
      return
    }

    if (label === 'Settings') {
      setPracticeMode(false)
      setMockInterview(false)
      setSettingsOpen(true)
      navigate('/settings')
      return
    }

    if (label === 'Overview') {
      setPracticeMode(false)
      setMockInterview(false)
      setSettingsOpen(false)
      setPracticeQuestion(null)
      setPracticeAnswer('')
      setPracticeResult(null)
      navigate('/dashboard')
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
    setMockCompletedQuestions((previous) => previous + 1)
  }

  const finishMockInterview = () => {
    const summary = summarizeMockInterview(mockQuestions, mockAnswers)
    const latestScore = summary.averageScore || 0

    setMockResult(summary)
    setMockInterview(false)
    setMockFinished(true)

    setLocalProgress((previous) => ({
      ...previous,
      mockInterviews: previous.mockInterviews + 1,
      mockInterviewScore: latestScore,
      readiness: Math.min(
        100,
        Math.max(Number(previous.readiness || 0), latestScore)
      ),
    }))

    if (dashboard) {
      setDashboard((previous) => ({
        ...(previous || {}),
        readiness: Math.min(
          100,
          Math.max(Number(previous?.readiness || 0), latestScore)
        ),
      }))
    }
  }

  const userName = user?.name || 'User'
  const userEmail = user?.email || ''
  const firstName = userName.split(' ')[0] || 'User'
  const streak = dashboard?.streak ?? 0
  const weeklyPractice = dashboard?.weeklyPractice ?? 0
  const weeklyGoal = dashboard?.weeklyGoal ?? 220
  const readiness = dashboard?.readiness ?? 0
  const tracks = dashboard?.tracks?.length
    ? dashboard.tracks.map((track, index) => ({
        ...track,
        color:
          index === 0
            ? 'coral'
            : index === 1
              ? 'teal'
              : 'gold',
        meta: track.lessons || track.meta || '',
      }))
    : fallbackTracks

  const remainingSessions = Math.max(weeklyGoal - weeklyPractice, 0)
  const practicePercentage =
    weeklyGoal > 0 ? Math.min((weeklyPractice / weeklyGoal) * 100, 100) : 0

  const overallScore = Math.round(
    (Math.min(streak * 10, 100) +
      Math.min(practicePercentage, 100) +
      Math.min(localProgress.completedPractice * 5, 100) +
      Math.min(localProgress.mockInterviewScore || 0, 100)) /
      4
  )

  const value = {
    // Auth & User
    authenticated,
    setAuthenticated,
    authMode,
    setAuthMode,
    showPassword,
    setShowPassword,
    authMessage,
    setAuthMessage,
    authLoading,
    user,
    setUser,
    userName,
    userEmail,
    firstName,
    form,
    updateForm,
    submitAuth,
    handleLogout,

    // Dashboard metrics
    dashboard,
    dashboardLoading,
    dashboardError,
    streak,
    weeklyPractice,
    weeklyGoal,
    readiness,
    tracks,
    remainingSessions,
    practicePercentage,
    overallScore,

    // Practice
    practiceMode,
    setPracticeMode,
    practiceQuestion,
    setPracticeQuestion,
    practiceAnswer,
    setPracticeAnswer,
    practiceResult,
    setPracticeResult,
    practiceLoading,
    practiceScore,
    setPracticeScore,
    practiceTotal,
    setPracticeTotal,
    practiceFinished,
    setPracticeFinished,
    practiceAnswered,
    setPracticeAnswered,
    answerShown,
    setAnswerShown,
    startPracticeSession,
    nextPracticeQuestion,
    submitPracticeAnswer,
    finishPractice,
    practiceQuestions,

    // Mock Interview
    mockInterview,
    setMockInterview,
    mockQuestions,
    mockQuestionIndex,
    setMockQuestionIndex,
    mockAnswer,
    setMockAnswer,
    mockSubmitted,
    setMockSubmitted,
    mockFinished,
    setMockFinished,
    mockCompletedQuestions,
    mockAnswers,
    mockResult,
    mockValidation,
    setMockValidation,
    mockQuestion,
    submitMockAnswer,
    finishMockInterview,
    resetMockInterviewSession,

    // Progress
    localProgress,
    setLocalProgress,

    // UI & Navigation
    activeNav,
    setActiveNav,
    handleNavigation,
    menuOpen,
    setMenuOpen,
    settingsOpen,
    setSettingsOpen,
    searchOpen,
    setSearchOpen,
    searchTerm,
    setSearchTerm,
    formattedDate,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
