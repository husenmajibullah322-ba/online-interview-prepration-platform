import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './LandingPage.css'

export default function LandingPage() {
  const { authenticated, user } = useApp()

  return (
    <div className="lp-root">
      {/* Background Dot Grid Pattern */}
      <div className="lp-grid-pattern" />

      {/* ===================================================================
          STICKY NAVIGATION BAR
          =================================================================== */}
      <header className="lp-nav-wrapper">
        <div className="lp-container">
          <nav className="lp-navbar">
            <Link to="/" className="lp-brand">
              <span className="lp-brand-mark">/</span>
              <span>Prepwise</span>
            </Link>

            <div className="lp-nav-links">
              <a href="#features" className="lp-nav-link">Features</a>
              <a href="#how-it-works" className="lp-nav-link">How It Works</a>
              <a href="#tracks" className="lp-nav-link">Tracks</a>
              <a href="#metrics" className="lp-nav-link">Results</a>
            </div>

            <div className="lp-nav-actions">
              {authenticated ? (
                <>
                  <div className="lp-user-pill">
                    <div className="lp-user-avatar">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span>{user?.name || 'My Account'}</span>
                  </div>
                  <Link to="/dashboard" className="lp-btn-primary">
                    Dashboard
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="lp-btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/signup" className="lp-btn-primary lp-btn-accent">
                    Get Started Free
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* ===================================================================
          SECTION 1: HERO & AUTHENTIC INTERVIEW WORKSPACE PREVIEW
          =================================================================== */}
      <section className="lp-hero-section">
        <div className="lp-container">
          <div className="lp-hero-grid">
            <div className="lp-hero-content">
              <p className="lp-eyebrow">INTERVIEW READINESS PLATFORM</p>

              <h1 className="lp-hero-title">
                Master Tech Interviews with{' '}
                <span className="lp-coral">Real Practice & Mocks</span>
              </h1>

              <p className="lp-hero-desc">
                Sharpen your skills across Frontend, Backend, and System Design.
                Solve curated interview prompts, simulate timed interview rounds, and
                receive instant structured evaluation with detailed feedback.
              </p>

              <div className="lp-hero-actions">
                {authenticated ? (
                  <Link to="/dashboard" className="lp-btn-primary lp-btn-hero-main">
                    Go to Dashboard
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="lp-btn-primary lp-btn-hero-main lp-btn-accent">
                      Start Practicing Free
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                    <Link to="/login" className="lp-btn-outline">
                      Sign In
                    </Link>
                  </>
                )}
                <a href="#how-it-works" className="lp-btn-outline">
                  See How It Works ↓
                </a>
              </div>

              <div className="lp-hero-trust">
                <div className="lp-trust-item">
                  <svg className="lp-trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>100% Free Practice Tier</span>
                </div>
                <div className="lp-trust-item">
                  <svg className="lp-trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Instant Answer Evaluation</span>
                </div>
                <div className="lp-trust-item">
                  <svg className="lp-trust-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Realistic Timed Mocks</span>
                </div>
              </div>
            </div>

            {/* Hero Visual: Authentic Prepwise Question & Evaluation Card */}
            <div className="lp-hero-visual">
              <div className="lp-preview-card">
                <div className="lp-card-header">
                  <span className="lp-track-badge">
                    Frontend Engineer &bull; Technical Mock
                  </span>
                  <div className="lp-session-status">
                    <span className="lp-status-dot" />
                    <span>Question 2 of 5</span>
                  </div>
                </div>

                <div className="lp-question-prompt">
                  &ldquo;Explain how React&apos;s reconciliation algorithm works with keys and why index keys are discouraged.&rdquo;
                </div>

                <div className="lp-answer-preview">
                  <strong>Your Submitted Answer</strong>
                  &ldquo;React creates an in-memory Virtual DOM. During re-renders, it diffs new and old trees using an O(n) heuristic. Keys provide stable element identity across renders. Using array indices can break component state if items re-order...&rdquo;
                </div>

                {/* Instant Evaluation Feedback Banner */}
                <div className="lp-eval-banner">
                  <div className="lp-eval-top">
                    <div className="lp-eval-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>Answer Evaluated &bull; Strong Coverage</span>
                    </div>
                    <span className="lp-eval-score">Score: 94%</span>
                  </div>

                  <div className="lp-eval-tags">
                    <span className="lp-eval-tag">&bull; Virtual DOM Diffing</span>
                    <span className="lp-eval-tag">&bull; Heuristic O(n)</span>
                    <span className="lp-eval-tag">&bull; Key Stability</span>
                    <span className="lp-eval-tag">&bull; State Preservation</span>
                  </div>
                </div>
              </div>

              {/* Floating Dark Summary Bar */}
              <div className="lp-floating-summary">
                <div className="lp-summary-stat">
                  <span>Interview Score</span>
                  <strong>94% Average</strong>
                </div>
                <div className="lp-summary-stat">
                  <span>Questions Solved</span>
                  <strong>18 / 20 Total</strong>
                </div>
                <div className="lp-summary-stat">
                  <span>Readiness Track</span>
                  <strong style={{ color: '#e87d68' }}>Interview Ready</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: REAL PLATFORM PILLARS (FEATURES)
          =================================================================== */}
      <section id="features" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-eyebrow">BUILT FOR ENGINEERS</p>
            <h2 className="lp-section-title">
              Everything You Need to Ace Technical & Behavioral Rounds
            </h2>
            <p className="lp-section-desc">
              Designed around the real interview process at high-growth startups and top tech firms.
            </p>
          </div>

          <div className="lp-features-grid">
            {/* Feature 1: Targeted Technical Practice */}
            <div className="lp-feature-card">
              <div className="lp-feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <h3>Targeted Practice Drills</h3>
              <p>
                Work through real interview questions across core disciplines. Reveal on-demand
                hints and compare your reasoning against curated model answers.
              </p>
              <div className="lp-feature-card-footer">
                <span>Explore questions</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            {/* Feature 2: Realistic Timed Mock Interviews */}
            <div className="lp-feature-card">
              <div className="lp-feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Timed Mock Interviews</h3>
              <p>
                Test your composure in full multi-question interview simulations. Feel the pacing,
                manage your time, and review comprehensive end-of-session performance reports.
              </p>
              <div className="lp-feature-card-footer">
                <span>Start a mock session</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            {/* Feature 3: Automated Answer Evaluation */}
            <div className="lp-feature-card">
              <div className="lp-feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Instant Answer Evaluation</h3>
              <p>
                Submit your technical explanation and receive immediate scoring, keyword concept
                coverage, and actionable suggestions to refine your clarity.
              </p>
              <div className="lp-feature-card-footer">
                <span>Keyword coverage analysis</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            {/* Feature 4: Role-Based Tracks & Progress */}
            <div className="lp-feature-card">
              <div className="lp-feature-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              </div>
              <h3>Readiness & Milestone Tracking</h3>
              <p>
                Follow your journey with visual mastery bars, interview count metrics,
                and accuracy percentages that prove when you are ready to interview.
              </p>
              <div className="lp-feature-card-footer">
                <span>Track your progress</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: HOW IT WORKS — THE 4-STEP INTERVIEW ROADMAP
          =================================================================== */}
      <section id="how-it-works" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-eyebrow">YOUR PREPARATION ROADMAP</p>
            <h2 className="lp-section-title">
              From First Drill to Job Offer in 4 Simple Steps
            </h2>
            <p className="lp-section-desc">
              A structured loop designed to turn technical uncertainty into instinctive mastery.
            </p>
          </div>

          <div className="lp-steps-container">
            {/* Step 1 */}
            <div className="lp-step-card">
              <div className="lp-step-num">01</div>
              <div className="lp-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h4>Choose Your Domain</h4>
              <p>
                Select from Frontend, Backend, System Architecture, or Behavioral tracks.
              </p>
              <div className="lp-step-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="lp-step-card">
              <div className="lp-step-num">02</div>
              <div className="lp-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                </svg>
              </div>
              <h4>Practice Core Prompts</h4>
              <p>
                Formulate your answers, check dynamic hints, and verify core technical ideas.
              </p>
              <div className="lp-step-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="lp-step-card">
              <div className="lp-step-num">03</div>
              <div className="lp-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <h4>Simulate Under Pressure</h4>
              <p>
                Enter timed mock rounds and experience true interview conditions.
              </p>
              <div className="lp-step-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>

            {/* Step 4 */}
            <div className="lp-step-card">
              <div className="lp-step-num">04</div>
              <div className="lp-step-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4>Review & Track Readiness</h4>
              <p>
                Analyze your scores, identify weak spots, and benchmark your progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: METRICS & CONVERSION CTA BANNER
          =================================================================== */}
      <section id="metrics" className="lp-cta-section">
        <div className="lp-container">
          {/* Metrics Strip */}
          <div className="lp-metrics-strip">
            <div className="lp-metric-item">
              <h3>10,000+</h3>
              <p>Questions Answered & Graded</p>
            </div>
            <div className="lp-metric-item">
              <h3>94.2%</h3>
              <p>Average Practice Accuracy</p>
            </div>
            <div className="lp-metric-item">
              <h3>15+</h3>
              <p>Curated Engineering Tracks</p>
            </div>
            <div className="lp-metric-item">
              <h3>4.9 / 5</h3>
              <p>Candidate Satisfaction</p>
            </div>
          </div>

          {/* Conversion Banner */}
          <div className="lp-banner-box" id="tracks">
            <div className="lp-banner-content">
              <h2 className="lp-banner-title">
                Ready to Level Up Your Interview Confidence?
              </h2>
              <p className="lp-banner-desc">
                Join software engineers practicing every day to land offers at their dream companies.
              </p>

              <div className="lp-banner-actions">
                {authenticated ? (
                  <Link to="/dashboard" className="lp-btn-primary lp-btn-hero-main">
                    Enter Your Dashboard
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="lp-btn-primary lp-btn-hero-main">
                      Create Your Free Account
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                    <Link to="/login" className="lp-btn-outline">
                      Sign In to Account
                    </Link>
                  </>
                )}
              </div>

              <div className="lp-banner-guarantee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#287a54" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Zero setup required &bull; Free practice access &bull; Built for engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER
          =================================================================== */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <div className="lp-brand" style={{ marginBottom: 12 }}>
                <span className="lp-brand-mark">/</span>
                <span>Prepwise</span>
              </div>
              <p>
                An interview preparation platform dedicated to helping software engineers
                practice technical questions and mock interviews with structured feedback.
              </p>
            </div>

            <div className="lp-footer-col">
              <h5>Platform</h5>
              <ul className="lp-footer-links">
                <li><a href="#features">Practice Drills</a></li>
                <li><a href="#features">Mock Interviews</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#metrics">Success Metrics</a></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h5>Tracks</h5>
              <ul className="lp-footer-links">
                <li><Link to={authenticated ? "/practice" : "/login"}>Frontend Development</Link></li>
                <li><Link to={authenticated ? "/practice" : "/login"}>Backend & APIs</Link></li>
                <li><Link to={authenticated ? "/practice" : "/login"}>System Architecture</Link></li>
                <li><Link to={authenticated ? "/practice" : "/login"}>Behavioral Interviews</Link></li>
              </ul>
            </div>

            <div className="lp-footer-col">
              <h5>Account</h5>
              <ul className="lp-footer-links">
                {authenticated ? (
                  <>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/practice">Practice</Link></li>
                    <li><Link to="/mock-interviews">Mock Interviews</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login">Sign In</Link></li>
                    <li><Link to="/signup">Register Free</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <span>&copy; {new Date().getFullYear()} Prepwise. All rights reserved.</span>
            <div className="lp-status-indicator">
              <span className="lp-status-dot" />
              All Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
