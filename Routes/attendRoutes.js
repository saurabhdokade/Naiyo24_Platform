const express = require('express');
const router = express.Router();
const { markAttendance,candidateDashboard,adminDashboard,hrDashboard,getAttendanceForMonth,exportAttendanceToCSV } = require('../Controller/attendController');
const { isAuthenticatedUser, isAuthenticatedCandidate } = require('../middlewares/auth');

router.post('/attendance', isAuthenticatedUser, markAttendance);
router.get('/export/csv', isAuthenticatedUser,exportAttendanceToCSV);

router.get('/monthly',isAuthenticatedUser, getAttendanceForMonth);
// Candidate
router.get('/candidate',isAuthenticatedCandidate,candidateDashboard);

// Admin
router.get('/admin', adminDashboard);

// HR
router.get('/hr', hrDashboard);

module.exports = router;
