import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Flame,
  Play,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function OverviewPage() {
  const navigate = useNavigate()
  const {
    dashboardLoading,
    dashboardError,
    firstName,
    startPracticeSession,
    streak,
    weeklyPractice,
    weeklyGoal,
    practicePercentage,
    remainingSessions,
    readiness,
    tracks,
    handleNavigation,
    answerShown,
    setAnswerShown,
  } = useApp()

  return (
    <>
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
          <p className="eyebrow">KEEP THE MOMENTUM</p>
          <h1>
            Good morning, {firstName}
            <span>✦</span>
          </h1>
          <p className="subcopy">
            A little progress today makes interview day feel easy.
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
          Start a practice session
        </button>
      </section>

      {/* STATS */}
      <section className="stats-grid">
        <div className="stat-card dark">
          <div className="stat-icon">
            <Flame size={19} />
          </div>
          <span>Current streak</span>
          <strong>
            {streak}
            <small> days</small>
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
          <small className="muted">Keep practicing every day</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon teal-icon">
            <Target size={19} />
          </div>
          <span>Practice this week</span>
          <strong>
            {weeklyPractice}
            <small> / {weeklyGoal}</small>
          </strong>
          <div className="progress-line">
            <i style={{ width: `${practicePercentage}%` }} />
          </div>
          <small className="muted">
            {remainingSessions === 0
              ? 'Weekly goal completed!'
              : `${remainingSessions} sessions to go`}
          </small>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold-icon">
            <Trophy size={19} />
          </div>
          <span>Readiness score</span>
          <strong>
            {readiness}
            <small>%</small>
          </strong>
          <div className="progress-line gold-line">
            <i style={{ width: `${readiness}%` }} />
          </div>
          <small className="muted">Your current preparation level</small>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="main-grid">
        <div className="panel tracks-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR LEARNING PATH</p>
              <h2>Skill tracks</h2>
            </div>

            <button
              className="text-btn"
              onClick={() => handleNavigation('My progress')}
            >
              View all
              <ArrowRight size={15} />
            </button>
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

        {/* MOCK INTERVIEW */}
        <div className="panel calendar-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">UP NEXT</p>
              <h2>Mock interview</h2>
            </div>
            <CalendarDays size={20} className="calendar-icon" />
          </div>

          <div className="interview-date">
            <strong>24</strong>
            <span>
              SEP
              <br />
              <b>2026</b>
            </span>

            <div>
              <strong>Frontend Engineer</strong>
              <small>Technical round · 45 min</small>
            </div>
          </div>

          <div className="interview-footer">
            <span>
              <i className="online-dot" />
              Scheduled with Maya Chen
            </span>

            <button
              aria-label="Open mock interview"
              onClick={() => handleNavigation('Mock interviews')}
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* BOTTOM GRID */}
      <section className="bottom-grid">
        <div className="panel question-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">DAILY CHALLENGE</p>
              <h2>Question of the day</h2>
            </div>
            <span className="difficulty">MEDIUM</span>
          </div>

          <p className="question">
            What is the difference between <code>==</code> and <code>===</code>{' '}
            in JavaScript?
          </p>

          {answerShown ? (
            <div className="answer">
              <Check size={16} />
              <span>
                <strong>Correct.</strong> <code>===</code> checks value and
                type, while <code>==</code> allows type coercion.
              </span>
            </div>
          ) : (
            <button
              className="outline-btn"
              onClick={() => setAnswerShown(true)}
            >
              Reveal answer
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        <div className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h2>Nice work this week</h2>
            </div>

            <button
              className="icon-btn"
              aria-label="View activity"
              onClick={() => handleNavigation('My progress')}
            >
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="activity-row">
            <div className="activity-icon coral">
              <Check size={17} />
            </div>
            <div>
              <strong>JavaScript fundamentals</strong>
              <span>Completed lesson 18</span>
            </div>
            <time>2h ago</time>
          </div>

          <div className="activity-row">
            <div className="activity-icon teal">
              <Play size={15} fill="currentColor" />
            </div>
            <div>
              <strong>Behavioral practice</strong>
              <span>Scored 86% on session</span>
            </div>
            <time>Yesterday</time>
          </div>

          <div className="activity-row">
            <div className="activity-icon gold">
              <Trophy size={17} />
            </div>
            <div>
              <strong>Progress updated</strong>
              <span>Keep building your interview skills</span>
            </div>
            <time>Today</time>
          </div>
        </div>
      </section>
    </>
  )
}
