const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');
const inMemoryDb = require('../data/inMemoryDb');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = inMemoryDb.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
  }

  // Demo pass check
  const isMatch = password === user.passwordHash || (user.email === 'admin@workpulse.io' && password === 'admin123') || (user.email === 'alex.rivera@workpulse.io' && password === 'employee123');

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid password. Please verify and try again.' });
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Authentication successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      avatar: user.avatar,
      department: user.department,
      designation: user.designation,
    },
  });
});

// GET /api/auth/me
router.get('/me', verifyToken, (req, res) => {
  const user = inMemoryDb.findUserById(req.user.id) || inMemoryDb.findUserByEmail(req.user.email);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      avatar: user.avatar,
      department: user.department,
      designation: user.designation,
    },
  });
});

// POST /api/auth/forgot-password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `Password reset instructions have been dispatched to ${email || 'your registered address'}. For demo purposes, use admin123 or employee123.`,
  });
});

module.exports = router;

