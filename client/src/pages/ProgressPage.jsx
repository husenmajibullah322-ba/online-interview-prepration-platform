import { useNavigate } from 'react-router-dom'
import {
  Award,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Flame,
  Play,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ProgressPage() {
  const navigate = useNavigate()
  const {
    startPracticeSession,
    localProgress,
    readiness,
    tracks,
    weeklyPractice,
    weeklyGoal,
    practicePercentage,
    remainingSessions,
    streak,
  } = useApp()

  const answerAccuracy =
    localProgress.totalAnswers > 0
      ? Math.round(
          (localProgress.correctAnswers / localProgress.totalAnswers) * 100
        )
      : 0

  const overallProgress = Math.round(
    ((readiness || 0) +
      answerAccuracy +
      Math.min(localProgress.completedPractice * 5, 100) +
      Math.min(localProgress.mockInterviewScore || 0, 100)) /
      4
  )

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">YOUR PROGRESS</p>
          <h1>
            Track your progress
            <span>✦</span>
          </h1>
          <p className="subcopy">
            See your learning activity and interview preparation progress.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            startPracticeSession()
            navigate('/practice')
          }}
        >
          <Play size={16} fill="currentColor" />
          Practice now
        </button>
      </section>

      <section className="stats-grid">
        <div className="stat-card dark">
          <div className="stat-icon">
            <Trophy size={19} />
          </div>
          <span>Overall progress</span>
          <strong>
            {overallProgress}
            <small>%</small>
          </strong>
          <div className="progress-line">
            <i style={{ width: `${Math.min(overallProgress, 100)}%` }} />
          </div>
          <small className="muted">Keep learning consistently</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon teal-icon">
            <BookOpen size={19} />
          </div>
          <span>Practice sessions</span>
          <strong>{localProgress.completedPractice}</strong>
          <small className="muted">Completed sessions</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold-icon">
            <Target size={19} />
          </div>
          <span>Answer accuracy</span>
          <strong>
            {answerAccuracy}
            <small>%</small>
          </strong>
          <div className="progress-line gold-line">
            <i style={{ width: `${answerAccuracy}%` }} />
          </div>
          <small className="muted">Based on practice answers</small>
        </div>
      </section>

      <section className="main-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">LEARNING PROGRESS</p>
              <h2>Skill tracks</h2>
            </div>
            <BarChart3 size={20} />
          </div>

          {tracks.map((track) => (
            <div className="track" key={track.name}>
              <div className={`track-icon ${track.color}`}>
                {track.color === 'coral' ? (
                  <BriefcaseBusiness size={18} />
                ) : track.color === 'teal' ? (
                  <BookOpen size={18} />
                ) : (
                  <Users size={18} />
                )}
              </div>

              <div className="track-info">
                <div className="track-top">
                  <strong>{track.name}</strong>
                  <span>{track.progress}%</span>
                </div>

                <div className="track-bar">
                  <i
                    className={track.color}
                    style={{ width: `${track.progress}%` }}
                  />
                </div>

                <small>
                  {track.type}
                  <b> · </b>
                  {track.meta}
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">WEEKLY ACTIVITY</p>
              <h2>Practice goal</h2>
            </div>
            <Target size={20} />
          </div>

          <div
            style={{
              marginTop: '30px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: '700',
              }}
            >
              {weeklyPractice}
              <span
                style={{
                  fontSize: '22px',
                  opacity: 0.5,
                }}
              >
                {' '}
                / {weeklyGoal}
              </span>
            </div>

            <p>practice sessions this week</p>

            <div className="progress-line" style={{ marginTop: '25px' }}>
              <i style={{ width: `${practicePercentage}%` }} />
            </div>

            <p style={{ marginTop: '15px' }}>
              {remainingSessions === 0
                ? 'Weekly goal completed!'
                : `${remainingSessions} sessions remaining`}
            </p>
          </div>
        </div>
      </section>

      <section className="panel" style={{ marginTop: '24px' }}>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">ACHIEVEMENTS</p>
            <h2>Your milestones</h2>
          </div>
          <Award size={20} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '25px',
          }}
        >
          <div
            style={{
              padding: '20px',
              border: '1px solid #e5e1d8',
              borderRadius: '14px',
            }}
          >
            <Trophy size={22} />
            <h3>First Practice</h3>
            <p>Complete your first practice session.</p>
            <strong>
              {localProgress.completedPractice >= 1
                ? '✓ Completed'
                : 'Not completed'}
            </strong>
          </div>

          <div
            style={{
              padding: '20px',
              border: '1px solid #e5e1d8',
              borderRadius: '14px',
            }}
          >
            <Target size={22} />
            <h3>Accuracy</h3>
            <p>Get at least 70% answer accuracy.</p>
            <strong>
              {answerAccuracy >= 70 ? '✓ Completed' : 'Keep practicing'}
            </strong>
          </div>

          <div
            style={{
              padding: '20px',
              border: '1px solid #e5e1d8',
              borderRadius: '14px',
            }}
          >
            <Flame size={22} />
            <h3>Consistency</h3>
            <p>Continue practicing every week.</p>
            <strong>{streak > 0 ? '✓ Active' : 'Start today'}</strong>
          </div>
        </div>
      </section>
    </>
  )
}
