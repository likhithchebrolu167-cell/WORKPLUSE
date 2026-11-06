const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    department: { type: String, required: true },
    assignedTo: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String },
      designation: { type: String },
    },
    priority: { type: String, enum: ['Urgent', 'High', 'Medium', 'Low'], default: 'Medium' },
    status: { type: String, enum: ['To Do', 'In Progress', 'Review', 'Completed'], default: 'To Do' },
    deadline: { type: String, required: true },
    completedAt: { type: String },
    isCompletedOnTime: { type: Boolean, default: true },
    tags: [{ type: String }],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);

