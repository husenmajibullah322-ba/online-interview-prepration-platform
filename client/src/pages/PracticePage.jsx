import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, RotateCcw, Trophy, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function PracticePage() {
  const navigate = useNavigate()
  const {
    practiceFinished,
    setPracticeFinished,
    practiceQuestion,
    practiceAnswer,
    setPracticeAnswer,
    practiceResult,
    practiceLoading,
    practiceScore,
    setPracticeScore,
    practiceTotal,
    setPracticeTotal,
    practiceAnswered,
    setPracticeAnswered,
    practiceQuestions,
    startPracticeSession,
    nextPracticeQuestion,
    submitPracticeAnswer,
    finishPractice,
  } = useApp()

  if (practiceFinished) {
    const percentage =
      practiceAnswered > 0
        ? Math.round((practiceScore / practiceAnswered) * 100)
        : 0

    return (
      <section
        className="panel"
        style={{
          maxWidth: '700px',
          margin: '50px auto',
          padding: '45px',
          textAlign: 'center',
        }}
      >
        <Trophy size={48} style={{ marginBottom: '20px' }} />

        <p className="eyebrow">PRACTICE COMPLETE</p>

        <h1>
          Great work!
          <span>✦</span>
        </h1>

        <p className="subcopy">You completed your practice session.</p>

        <div
          style={{
            marginTop: '30px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
          }}
        >
          <div className="stat-card">
            <span>Score</span>
            <strong>
              {practiceScore}
              <small> / {practiceAnswered}</small>
            </strong>
          </div>

          <div className="stat-card">
            <span>Accuracy</span>
            <strong>
              {percentage}
              <small>%</small>
            </strong>
          </div>

          <div className="stat-card">
            <span>Questions</span>
            <strong>{practiceAnswered}</strong>
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
              navigate('/practice')
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
              navigate('/dashboard')
            }}
          >
            <ArrowRight size={15} />
            Back to overview
          </button>
        </div>
      </section>
    )
  }

  if (!practiceQuestion) {
    return (
      <section className="welcome-row">
        <div>
          <p className="eyebrow">PRACTICE SESSION</p>
          <h1>No questions available</h1>
          <p className="subcopy">Start a new practice session to continue.</p>
        </div>
        <button className="primary-btn" onClick={startPracticeSession}>
          Start session
        </button>
      </section>
    )
  }

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">PRACTICE SESSION</p>
          <h1>
            Interview practice
            <span>✦</span>
          </h1>
          <p className="subcopy">
            Answer the question in your own words and improve your interview skills.
          </p>
        </div>

        <button
          className="outline-btn"
          onClick={finishPractice}
          disabled={practiceLoading}
        >
          <X size={16} />
          {practiceLoading ? 'Saving...' : 'End session'}
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
            <p className="eyebrow">
              QUESTION {practiceAnswered + 1} OF {practiceQuestions.length}
            </p>
            <h2>Technical interview</h2>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
            }}
          >
            <Trophy size={19} />
            <div>
              <strong>
                Score: {practiceScore} / {practiceAnswered}
              </strong>
              <div
                style={{
                  marginTop: '10px',
                  fontSize: '14px',
                  opacity: 0.65,
                }}
              >
                {practiceAnswered} question
                {practiceAnswered === 1 ? '' : 's'} answered
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

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '26px', lineHeight: '1.4' }}>
            {practiceQuestion.question}
          </h2>
        </div>

        <textarea
          value={practiceAnswer}
          onChange={(event) => setPracticeAnswer(event.target.value)}
          placeholder="Write your answer here..."
          rows={7}
          disabled={practiceResult !== null}
          style={{
            width: '100%',
            marginTop: '25px',
            padding: '18px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            resize: 'vertical',
            fontSize: '16px',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />

        {!practiceResult && (
          <button
            className="primary-btn"
            onClick={submitPracticeAnswer}
            style={{ marginTop: '20px' }}
          >
            <Check size={17} />
            Submit answer
          </button>
        )}

        {practiceResult && (
          <div
            style={{
              marginTop: '25px',
              padding: '20px',
              borderRadius: '12px',
              background: practiceResult.correct ? '#edf9f1' : '#fff6e8',
              border: practiceResult.correct
                ? '1px solid #b7e4c7'
                : '1px solid #f1d29b',
            }}
          >
            <strong>
              {practiceResult.correct ? '✓ Correct!' : 'Keep practicing'}
            </strong>
            <p>{practiceResult.message}</p>

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

            <div style={{ marginTop: '15px' }}>
              <strong>Expected answer:</strong>
              <p>{practiceQuestion.answer}</p>
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
                <p style={{ margin: '6px 0 0' }}>{practiceResult.suggestion}</p>
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
            <button className="primary-btn" onClick={nextPracticeQuestion}>
              <RotateCcw size={16} />
              Next question
            </button>

            <button
              className="outline-btn"
              onClick={finishPractice}
              disabled={practiceLoading}
            >
              {practiceLoading ? 'Saving...' : 'Finish practice'}
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>
    </>
  )
}
