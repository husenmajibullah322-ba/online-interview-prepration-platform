import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import protect from './middleware/auth.js'
import Dashboard from './models/Dashboard.js'
import progressRoutes from './routes/progress.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/progress', progressRoutes)

const tracks = [
  {
    id: 'javascript',
    name: 'JavaScript fundamentals',
    type: 'Technical',
    progress: 72,
    lessons: '18 of 25 lessons'
  },
  {
    id: 'system-design',
    name: 'System design basics',
    type: 'Technical',
    progress: 38,
    lessons: '6 of 16 lessons'
  },
  {
    id: 'behavioral',
    name: 'Behavioral interviews',
    type: 'Soft skills',
    progress: 84,
    lessons: '21 of 25 lessons'
  }
]

app.get('/api/health', (_req, res) =>
  res.json({
    status: 'ok',
    service: 'prepwise-api'
  })
)

app.get('/api/dashboard', protect, async (req, res) => {
  try {
    const userId = req.user.id

    let dashboard = await Dashboard.findOne({ userId })

    if (!dashboard) {
      dashboard = await Dashboard.create({
        userId,
        streak: 0,
        weeklyPractice: 0,
        weeklyGoal: 220,
        readiness: 0,
        tracks
      })
    }

    res.json({
      user: {
        name: req.user.name,
        email: req.user.email,
        plan: 'Free plan'
      },
      streak: dashboard.streak,
      weeklyPractice: dashboard.weeklyPractice,
      weeklyGoal: dashboard.weeklyGoal,
      readiness: dashboard.readiness,
      tracks: dashboard.tracks
    })
  } catch (error) {
    console.error('Dashboard error:', error.message)

    res.status(500).json({
      message: 'Could not load dashboard.'
    })
  }
})

app.get('/api/questions/daily', (_req, res) =>
  res.json({
    question: 'What is the difference between == and === in JavaScript?',
    difficulty: 'MEDIUM',
    answer: '=== checks both value and type, while == allows type coercion.'
  })
)

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prepwise')
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Prepwise API running on http://0.0.0.0:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })