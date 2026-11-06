const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/tasks
router.get('/', (req, res) => {
  const { department, priority, status, assignedTo, search } = req.query;
  const tasks = inMemoryDb.getTasks({ department, priority, status, assignedTo, search });
  res.json({ success: true, count: tasks.length, tasks });
});

// POST /api/tasks
router.post('/', (req, res) => {
  const { title, department, priority, deadline } = req.body;
  if (!title || !department) {
    return res.status(400).json({ success: false, message: 'Title and department are required.' });
  }
  const task = inMemoryDb.createTask(req.body);
  res.status(201).json({ success: true, task });
});

// PATCH /api/tasks/:id/status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required.' });
  }
  const task = inMemoryDb.updateTask(req.params.id, { status });
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }
  res.json({ success: true, task });
});

// PUT /api/tasks/:id
router.put('/:id', (req, res) => {
  const task = inMemoryDb.updateTask(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }
  res.json({ success: true, task });
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const ok = inMemoryDb.deleteTask(req.params.id);
  if (!ok) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }
  res.json({ success: true, message: 'Task deleted successfully.' });
});

module.exports = router;

