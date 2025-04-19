const express = require('express');
const router = express.Router();
const {startVideoSession,endVideoSession} = require('../Controller/videoSessionController');
const { isAuthenticatedUser } = require('../middlewares/auth');

// Start a video session (Protected)
router.post('/start', isAuthenticatedUser, startVideoSession);

// End a video session (Protected)
router.post('/end/:id', isAuthenticatedUser, endVideoSession);

module.exports = router;
