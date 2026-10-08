import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BarChart3,
  CalendarDays,
  Check,
  Play,
  RotateCcw,
  Target,
  Trophy,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { summarizeMockInterview } from '../utils/practiceSession'

export default function MockInterviewPage() {
  const navigate = useNavigate()
  const {
    mockFinished,
    setMockFinished,
    mockResult,
    setMockResult,
    mockQuestions,
    mockQuestionIndex,
    setMockQuestionIndex,
    mockAnswer,
    setMockAnswer,
    mockSubmitted,
    setMockSubmitted,
    mockCompletedQuestions,
    setMockCompletedQuestions,
    setMockInterview,
    mockAnswers,
    mockValidation,
    setMockValidation,
    mockQuestion,
    submitMockAnswer,
    finishMockInterview,
    startPracticeSession,
    localProgress,
  } = useApp()

  if (mockFinished) {
    const summary =
      mockResult || summarizeMockInterview(mockQuestions, mockAnswers)
    const completionPercentage = summary?.completion ?? 0
    const scorePercentage = summary?.averageScore ?? 0

    return (
      <>
        <section className="welcome-row">
          <div>
            <p className="eyebrow">INTERVIEW COMPLETE</p>
            <h1>
              Mock interview complete
              <span>✦</span>
            </h1>
            <p className="subcopy">
              You completed your mock interview session. Keep practicing to
              improve your confidence.
            </p>
          </div>

          <button
            className="outline-btn"
            onClick={() => {
              setMockFinished(false)
              setMockResult(null)
              setMockQuestionIndex(0)
              setMockAnswer('')
              setMockSubmitted(false)
              setMockCompletedQuestions(0)
              navigate('/dashboard')
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
            <span>Questions completed</span>
            <strong>
              {mockCompletedQuestions}
              <small> / {mockQuestions.length}</small>
            </strong>
          </div>

          <div className="stat-card">
            <div className="stat-icon teal-icon">
              <Target size={19} />
            </div>
            <span>Interview score</span>
            <strong>
              {scorePercentage}
              <small>%</small>
            </strong>
            <div className="progress-line">
              <i style={{ width: `${scorePercentage}%` }} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon gold-icon">
              <Trophy size={19} />
            </div>
            <span>Interview sessions</span>
            <strong>{localProgress.mockInterviews}</strong>
            <small className="muted">Completed mock interviews</small>
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
              <p className="eyebrow">SESSION SUMMARY</p>
              <h2>Your interview session</h2>
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
            <h3>Frontend Engineer</h3>
            <p>Technical mock interview</p>
            <p>
              Questions completed:{' '}
              <strong>
                {summary?.answeredCount || mockCompletedQuestions}
              </strong>
            </p>
            <p>
              Completion: <strong>{completionPercentage}%</strong>
            </p>
            <p>
              Interview score: <strong>{scorePercentage}%</strong>
            </p>
            <p>
              Strong answers: <strong>{summary?.strongAnswers ?? 0}</strong>
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
                navigate('/mock-interviews')
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
                navigate('/progress')
              }}
            >
              <BarChart3 size={16} />
              View my progress
            </button>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">MOCK INTERVIEWS</p>
          <h1>
            Get interview-ready
            <span>✦</span>
          </h1>
          <p className="subcopy">
            Practice realistic interview conversations before the real interview.
          </p>
        </div>

        <button
          className="outline-btn"
          onClick={() => {
            setMockInterview(false)
            navigate('/dashboard')
          }}
        >
          <ArrowRight size={15} />
          Back to overview
        </button>
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
            <p className="eyebrow">UPCOMING SESSION</p>
            <h2>Frontend Engineer</h2>
          </div>
          <CalendarDays size={22} />
        </div>

        <div
          style={{
            marginTop: '30px',
            padding: '25px',
            borderRadius: '14px',
            background: '#f8f6f1',
          }}
        >
          <h3>24 September 2026</h3>
          <p>Technical round · 45 minutes</p>
          <p>Scheduled with Maya Chen</p>
        </div>

        <div
          style={{
            marginTop: '25px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            className="primary-btn"
            onClick={() => {
              setMockInterview(false)
              startPracticeSession()
              navigate('/practice')
            }}
          >
            <Play size={16} fill="currentColor" />
            Practice before interview
          </button>

          <button
            className="outline-btn"
            onClick={() => {
              setMockInterview(false)
              navigate('/dashboard')
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
          <p className="eyebrow">INTERVIEW QUESTION</p>
          <p className="muted" style={{ marginTop: '8px' }}>
            Question {mockQuestionIndex + 1} of {mockQuestions.length}
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
              style={{ marginTop: '15px' }}
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
              <strong>✓ Answer submitted</strong>
              <p>
                Your mock interview response has been recorded for this session.
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

              {mockQuestionIndex < mockQuestions.length - 1 ? (
                <button
                  className="primary-btn"
                  onClick={() => {
                    setMockQuestionIndex((previous) => previous + 1)
                    setMockAnswer('')
                    setMockSubmitted(false)
                  }}
                >
                  Next question
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button className="primary-btn" onClick={finishMockInterview}>
                  Finish interview
                  <Check size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
