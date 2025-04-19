const express = require('express');
const router = express.Router();
const {createInterview,getAllInterviews,updateInterviewStatus} = require('../Controller/interviewController');
const { isAuthenticatedUser } = require('../middlewares/auth');

// Create a new interview (Admin only)
router.post('/add', isAuthenticatedUser, createInterview);

// Get all interviews (Admin only)
router.get('/all', isAuthenticatedUser, getAllInterviews);

// Update interview status (Admin only)
router.put('/:id/status', isAuthenticatedUser, updateInterviewStatus);

module.exports = router;
