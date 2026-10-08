import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()
const createToken = (user) => jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'development-secret', { expiresIn: '7d' })
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email })

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' })
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) return res.status(409).json({ message: 'An account with this email already exists.' })
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) })
    res.status(201).json({ token: createToken(user), user: publicUser(user) })
  } catch (error) {
    res.status(500).json({ message: 'Could not create your account.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email?.toLowerCase() })
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' })
    res.json({ token: createToken(user), user: publicUser(user) })
  } catch (error) {
    res.status(500).json({ message: 'Could not sign you in.' })
  }
})

export default router
