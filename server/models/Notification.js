const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    recipientRole: { type: String, enum: ['all', 'admin', 'employee'], default: 'all' },
    recipientId: { type: String }, // specific employeeId or null
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['deadline', 'overdue', 'assignment', 'attendance', 'system', 'performance'], default: 'system' },
    read: { type: Boolean, default: false },
    timestamp: { type: String, default: () => new Date().toISOString() },
    link: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);

