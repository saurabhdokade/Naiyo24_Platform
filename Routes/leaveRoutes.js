// /server/routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const {createLeaveRequest,approveLeaveByManager,approveLeaveByHR,createLeavePolicy} = require('../Controller/leaveController');

// Create leave request
router.post('/create', createLeaveRequest);

// Manager approval
router.post('/approve-manager', approveLeaveByManager);

// HR approval
router.post('/approve-hr', approveLeaveByHR);

// Admin can add leave policies
router.post('/policy/create', createLeavePolicy);


module.exports = router;
