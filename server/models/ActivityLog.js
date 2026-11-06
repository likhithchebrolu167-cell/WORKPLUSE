const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // 'task_completed', 'clock_in', 'task_created', 'employee_joined', etc.
    title: { type: String, required: true },
    description: { type: String },
    actor: {
      id: { type: String },
      name: { type: String, required: true },
      avatar: { type: String },
    },
    meta: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);

