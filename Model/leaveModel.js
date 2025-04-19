// /server/models/LeaveRequest.js
const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved by Manager', 'Approved by HR', 'Rejected'],
    default: 'Pending',
  },
  managerApproval: {
    type: Boolean,  // true if manager approves
    default: null,  // null means not yet approved
  },
  hrApproval: {
    type: Boolean,  // true if HR approves
    default: null,  // null means not yet approved
  },
  rejectionReason: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
module.exports = LeaveRequest;
