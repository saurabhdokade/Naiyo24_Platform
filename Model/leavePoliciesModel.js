// /server/models/LeavePolicy.js
const mongoose = require('mongoose');

const leavePolicySchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
  },
  maxDaysPerYear: {
    type: Number,
    required: true,
  },
  approvalLevels: {
    type: [String],  // ["Manager", "HR"]
    required: true,
  },
});

const LeavePolicy = mongoose.model('LeavePolicy', leavePolicySchema);
module.exports = LeavePolicy;
