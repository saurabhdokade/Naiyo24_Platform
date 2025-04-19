const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile',
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['clock-in', 'clock-out'],
    required: true,
  },
  ip: String,
  geo: {
    lat: Number,
    lon: Number,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
