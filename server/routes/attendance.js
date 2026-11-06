const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/attendance
router.get('/', (req, res) => {
  const { employeeId, department, date } = req.query;
  const history = inMemoryDb.getAttendanceHistory({ employeeId, department, date });
  res.json({ success: true, count: history.length, history });
});

// GET /api/attendance/today/:employeeId
router.get('/today/:employeeId', (req, res) => {
  const data = inMemoryDb.getTodayAttendance(req.params.employeeId);
  res.json({ success: true, ...data });
});

// POST /api/attendance/clock-in
router.post('/clock-in', (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ success: false, message: 'Employee ID required.' });
  const result = inMemoryDb.clockIn(employeeId);
  if (result.error) return res.status(404).json({ success: false, message: result.error });
  res.json({ success: true, message: 'Clock-in recorded successfully.', ...result });
});

// POST /api/attendance/clock-out
router.post('/clock-out', (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ success: false, message: 'Employee ID required.' });
  const result = inMemoryDb.clockOut(employeeId);
  if (result.error) return res.status(404).json({ success: false, message: result.error });
  res.json({ success: true, message: 'Clock-out recorded successfully.', ...result });
});

// POST /api/attendance/break-start
router.post('/break-start', (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ success: false, message: 'Employee ID required.' });
  const result = inMemoryDb.startBreak(employeeId);
  if (result.error) return res.status(404).json({ success: false, message: result.error });
  res.json({ success: true, message: 'Break started.', ...result });
});

// POST /api/attendance/break-end
router.post('/break-end', (req, res) => {
  const { employeeId } = req.body;
  if (!employeeId) return res.status(400).json({ success: false, message: 'Employee ID required.' });
  const result = inMemoryDb.endBreak(employeeId);
  if (result.error) return res.status(404).json({ success: false, message: result.error });
  res.json({ success: true, message: 'Break ended. Work resumed.', ...result });
});

module.exports = router;

