import { Router } from 'express'
import Dashboard from '../models/Dashboard.js'
import protect from '../middleware/auth.js'

const router = Router()

router.patch('/practice', protect, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      userId: req.user.id
    })

    if (!dashboard) {
      return res.status(404).json({
        message: 'Dashboard not found.'
      })
    }

    dashboard.weeklyPractice += 1

    if (dashboard.weeklyPractice >= 220) {
      dashboard.weeklyPractice = 0
    }

    await dashboard.save()

    res.json({
      message: 'Practice progress updated.',
      weeklyPractice: dashboard.weeklyPractice,
      weeklyGoal: dashboard.weeklyGoal
    })
  } catch (error) {
    console.error('Practice update error:', error.message)

    res.status(500).json({
      message: 'Could not update practice progress.'
    })
  }
})

export default router