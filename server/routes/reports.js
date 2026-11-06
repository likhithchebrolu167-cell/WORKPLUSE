const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/reports
router.get('/', (req, res) => {
  const { type = 'monthly', department } = req.query;
  const report = inMemoryDb.generateReport(type, { department });
  res.json({ success: true, report });
});

// GET /api/reports/export/csv
router.get('/export/csv', (req, res) => {
  const { type = 'monthly', department } = req.query;
  const report = inMemoryDb.generateReport(type, { department });

  // Format CSV
  const headers = [
    'Employee ID',
    'Full Name',
    'Email',
    'Department',
    'Designation',
    'Assigned Tasks',
    'Completed Tasks',
    'Completion Rate',
    'On-Time Rate',
    'Weekly Hours',
    'Productivity Score',
    'Status',
  ];

  const rows = report.data.map((r) => [
    `"${r.id}"`,
    `"${r.name}"`,
    `"${r.email}"`,
    `"${r.department}"`,
    `"${r.designation}"`,
    r.totalTasks,
    r.completedTasks,
    `"${r.taskCompletionRate}"`,
    `"${r.onTimeRate}"`,
    `"${r.weeklyHours}"`,
    `"${r.productivityScore}"`,
    `"${r.status}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=WorkPulse_Report_${type}_${Date.now()}.csv`);
  res.send(csvContent);
});

module.exports = router;

