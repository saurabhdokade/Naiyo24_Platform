const Attendance = require('../Model/AttendModel');
const AttenddashModel = require("../Model/AttenddashModel")
const Interview = require('../Model/interviewModel');
const User = require("../Model/employerModel");
const { parse } = require('json2csv');

exports.markAttendance = async (req, res) => {
  try {
    const { type, geo } = req.body;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const attendance = new Attendance({
      userId: req.user.id,
      type,
      ip,
      geo,
    });

    await attendance.save();
    res.status(201).json({ message: `${type} marked`, attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Controller
exports.candidateDashboard = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const interviews = await Interview.find({ candidate: userId });
  
      res.status(200).json({ interviews });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.adminDashboard = async (req, res) => {
    try {
      const interviews = await Interview.find()
        .populate('candidate')
        .populate('codeSubmissions')
        .populate('videoSession');
  
      res.status(200).json({ interviewSummaries: interviews });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
exports.hrDashboard = async (req, res) => {
    try {
      const shortlistedCandidates = await Interview.find({ status: 'Shortlisted' })
        .populate('candidate')
        .populate('offerLetter');
  
      res.status(200).json({ shortlistedCandidates });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.getAttendanceForMonth = async (req, res) => {
    try {
      const { month, year } = req.query;
      const userId = req.user.id; // assuming you're using auth middleware
  
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
  
      // Build base query
      let query = {
        userId,
        time: { $gte: startDate, $lte: endDate }
      };
  
      // If department filter is added
    //   if (departmentId) {
    //     const user = await User.findById(userId);
    //     if (user?.departmentId?.toString() !== departmentId) {
    //       return res.status(403).json({ message: 'User not in specified department' });
    //     }
    //   }
  
      const attendanceRecords = await Attendance.find(query).sort({ time: 1 });
      res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching attendance data');
    }
  };
  


exports.exportAttendanceToCSV = async (req, res) => {
    const { month, year } = req.query;
  
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
  
    try {
      const data = await Attendance.find({ date: { $gte: startDate, $lte: endDate } });
  
      const csv = parse(data, { fields: ['userId', 'date', 'status'] });
      res.header('Content-Type', 'text/csv');
      res.attachment('attendance.csv');
      res.send(csv);
    } catch (err) {
        console.log(err)
      res.status(500).send('Failed to export CSV');
    }
  };