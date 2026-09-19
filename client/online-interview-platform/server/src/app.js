const express = require('express');
const mongoose = require('mongoose');
const interviewRoutes = require('./routes/interviewRoutes');
const logger = require('./utils/logger');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/api/interviews', interviewRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  logger.info('Connected to MongoDB');
})
.catch(err => {
  logger.error('MongoDB connection error:', err);
});

// Export the app
module.exports = app;