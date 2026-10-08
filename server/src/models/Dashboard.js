import mongoose from 'mongoose'

const trackSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    lessons: {
      type: String,
      default: '',
    },
  },
  {
    _id: false,
  }
)

const dashboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    streak: {
      type: Number,
      default: 0,
      min: 0,
    },

    weeklyPractice: {
      type: Number,
      default: 0,
      min: 0,
    },

    weeklyGoal: {
      type: Number,
      default: 220,
      min: 1,
    },

    readiness: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    tracks: {
      type: [trackSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Dashboard', dashboardSchema)