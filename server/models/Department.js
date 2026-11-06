const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    lead: { type: String, required: true },
    leadAvatar: { type: String },
    budget: { type: String, default: '$250,000' },
    targetProductivity: { type: Number, default: 90 },
    currentProductivity: { type: Number, default: 88 },
    color: { type: String, default: '#795CF6' },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', DepartmentSchema);

