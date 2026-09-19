const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// Route to create a new interview
router.post('/interviews', interviewController.createInterview);

// Route to get all interviews
router.get('/interviews', interviewController.getAllInterviews);

// Route to get a specific interview by ID
router.get('/interviews/:id', interviewController.getInterviewById);

// Route to update an interview by ID
router.put('/interviews/:id', interviewController.updateInterview);

// Route to delete an interview by ID
router.delete('/interviews/:id', interviewController.deleteInterview);

module.exports = router;