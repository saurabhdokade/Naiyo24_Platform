// /server/controllers/leaveRequestController.js
const LeaveRequest = require('../Model/leaveModel');
const LeavePolicy = require('../Model/leavePoliciesModel');

exports.createLeaveRequest = async (req, res) => {
  const { userId, leaveType, startDate, endDate } = req.body;

  try {
    const newLeaveRequest = new LeaveRequest({
      userId,
      leaveType,
      startDate,
      endDate,
    });

    await newLeaveRequest.save();
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating leave request');
  }
};



// /server/controllers/leaveRequestController.js
exports.approveLeaveByManager = async (req, res) => {
    const { leaveRequestId, approvalStatus, managerId } = req.body;
  
    try {
      const leaveRequest = await LeaveRequest.findById(leaveRequestId);
  
      if (!leaveRequest) {
        return res.status(404).send('Leave request not found');
      }
  
      if (leaveRequest.status !== 'Pending') {
        return res.status(400).send('Leave request is already processed');
      }
  
      leaveRequest.managerApproval = approvalStatus; // true or false
      leaveRequest.status = approvalStatus ? 'Approved by Manager' : 'Rejected';
      leaveRequest.rejectionReason = approvalStatus ? null : 'Manager Rejected';
  
      // If approved by manager, move to HR for final approval
      if (approvalStatus) {
        leaveRequest.status = 'Approved by Manager';
      } else {
        leaveRequest.hrApproval = false;
      }
  
      await leaveRequest.save();
      res.status(200).json(leaveRequest);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing leave request');
    }
  };

  // /server/controllers/leaveRequestController.js
exports.approveLeaveByHR = async (req, res) => {
    const { leaveRequestId, approvalStatus } = req.body;
  
    try {
      const leaveRequest = await LeaveRequest.findById(leaveRequestId);
  
      if (!leaveRequest) {
        return res.status(404).send('Leave request not found');
      }
  
      if (leaveRequest.status !== 'Approved by Manager') {
        return res.status(400).send('Leave request not approved by manager yet');
      }
  
      leaveRequest.hrApproval = approvalStatus; // true or false
      leaveRequest.status = approvalStatus ? 'Approved by HR' : 'Rejected';
      leaveRequest.rejectionReason = approvalStatus ? null : 'HR Rejected';
  
      await leaveRequest.save();
      res.status(200).json(leaveRequest);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error processing HR approval');
    }
  };

  // /server/controllers/leavePolicyController.js

exports.createLeavePolicy = async (req, res) => {
  const { leaveType, maxDaysPerYear, approvalLevels } = req.body;

  try {
    const newPolicy = new LeavePolicy({
      leaveType,
      maxDaysPerYear,
      approvalLevels,
    });

    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating leave policy');
  }
};

  