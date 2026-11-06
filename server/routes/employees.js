const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/employees
router.get('/', (req, res) => {
  const { department, status, search } = req.query;
  const employees = inMemoryDb.getEmployees({ department, status, search });
  res.json({ success: true, count: employees.length, employees });
});

// GET /api/employees/:id
router.get('/:id', (req, res) => {
  const employee = inMemoryDb.getEmployeeById(req.params.id);
  if (!employee) {
    return res.status(404).json({ success: false, message: 'Employee not found.' });
  }

  // Gather specific employee profile data
  const empTasks = inMemoryDb.getTasks({ assignedTo: employee.employeeId });
  const empAttendance = inMemoryDb.getAttendanceHistory({ employeeId: employee.employeeId }).slice(0, 14);
  const completedTasks = empTasks.filter((t) => t.status === 'Completed').length;

  res.json({
    success: true,
    employee,
    metrics: {
      totalTasks: empTasks.length,
      completedTasks,
      completionRate: empTasks.length > 0 ? Math.round((completedTasks / empTasks.length) * 100) : employee.productivityScore,
      onTimeRate: employee.onTimeRate,
      weeklyHours: employee.weeklyHours,
      attendanceRate: '98.5%',
    },
    tasks: empTasks,
    attendance: empAttendance,
  });
});

// POST /api/employees
router.post('/', (req, res) => {
  const { name, email, department, designation, phone, location, status } = req.body;
  if (!name || !department || !designation) {
    return res.status(400).json({ success: false, message: 'Name, department, and designation are required.' });
  }
  const employee = inMemoryDb.createEmployee(req.body);
  res.status(201).json({ success: true, employee });
});

// PUT /api/employees/:id
router.put('/:id', (req, res) => {
  const updated = inMemoryDb.updateEmployee(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Employee not found.' });
  }
  res.json({ success: true, employee: updated });
});

// DELETE /api/employees/:id
router.delete('/:id', (req, res) => {
  const success = inMemoryDb.deleteEmployee(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Employee not found.' });
  }
  res.json({ success: true, message: 'Employee record removed successfully.' });
});

module.exports = router;

