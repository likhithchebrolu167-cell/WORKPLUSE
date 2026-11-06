const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    clockIn: { type: String }, // e.g. "08:55 AM"
    clockOut: { type: String }, // e.g. "05:15 PM"
    workingHours: { type: Number, default: 0 }, // e.g. 8.2
    breakMinutes: { type: Number, default: 0 },
    status: { type: String, enum: ['Present', 'Late', 'Half Day', 'On Leave', 'Absent'], default: 'Present' },
    sessions: [
      {
        type: { type: String, enum: ['work', 'break'] },
        startTime: { type: String },
        endTime: { type: String },
        durationMinutes: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', AttendanceSchema);

