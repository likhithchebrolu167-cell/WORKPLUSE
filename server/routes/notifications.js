const express = require('express');
const router = express.Router();
const inMemoryDb = require('../data/inMemoryDb');

// GET /api/notifications
router.get('/', (req, res) => {
  const { role = 'all', employeeId } = req.query;
  const notifications = inMemoryDb.getNotifications(role, employeeId);
  const unreadCount = notifications.filter((n) => !n.read).length;
  res.json({ success: true, count: notifications.length, unreadCount, notifications });
});

// PATCH /api/notifications/:id/read
router.patch('/:id/read', (req, res) => {
  const notif = inMemoryDb.markNotificationRead(req.params.id);
  res.json({ success: true, notification: notif });
});

// POST /api/notifications/mark-all-read
router.post('/mark-all-read', (req, res) => {
  inMemoryDb.markAllNotificationsRead();
  res.json({ success: true, message: 'All notifications marked as read.' });
});

module.exports = router;

