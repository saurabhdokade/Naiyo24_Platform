const express = require('express');
const router = express.Router();
const {executeCode} = require("../Controller/codingExecutionController");
const { isAuthenticatedUser } = require('../middlewares/auth');

// Execute candidate code (Protected)
router.post('/execute', isAuthenticatedUser,executeCode);

module.exports = router;
