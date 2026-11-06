const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/analytics/dashboard
router.get('/dashboard', (req, res) => {
  const analytics = inMemoryDb.getDashboardAnalytics();
  res.json({ success: true, ...analytics });
});

// GET /api/analytics/heatmap
router.get('/heatmap', (req, res) => {
  const heatmap = inMemoryDb.getProductivityHeatmap();
  res.json({ success: true, data: heatmap });
});

// GET /api/analytics/activity
router.get('/activity', (req, res) => {
  res.json({ success: true, activities: inMemoryDb.activityLogs });
});

module.exports = router;

