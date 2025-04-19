const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Half-Day', 'Leave'], required: true },
  IP: { type: String }, // IP address from which user clocked in
  geo: { type: { lat: Number, long: Number } }, // Geo coordinates
}, { timestamps: true });

module.exports = mongoose.model('Attendancee', attendanceSchema);
