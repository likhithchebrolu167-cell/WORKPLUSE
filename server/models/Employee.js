const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'employee' },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String },
    location: { type: String, default: 'Headquarters - San Francisco' },
    avatar: { type: String },
    status: { type: String, enum: ['Active', 'On Leave', 'Remote', 'Inactive'], default: 'Active' },
    joinDate: { type: String, default: '2023-01-15' },
    productivityScore: { type: Number, default: 88 },
    completedTasksCount: { type: Number, default: 0 },
    totalTasksCount: { type: Number, default: 0 },
    onTimeRate: { type: Number, default: 92 },
    weeklyHours: { type: Number, default: 38.5 },
    currentStatus: { type: String, enum: ['Working', 'On Break', 'Clocked Out'], default: 'Clocked Out' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', EmployeeSchema);

