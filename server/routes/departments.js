const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/departments
router.get('/', (req, res) => {
  const departments = inMemoryDb.getDepartments();
  res.json({ success: true, count: departments.length, departments });
});

module.exports = router;

