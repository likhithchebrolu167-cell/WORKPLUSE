require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const departmentRoutes = require('./routes/departments');
const taskRoutes = require('./routes/tasks');
const attendanceRoutes = require('./routes/attendance');
const analyticsRoutes = require('./routes/analytics');
const reportRoutes = require('./routes/reports');
const notificationRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for clarity
app.use((req, res, next) => {
  console.log(`[WorkPulse API] ${req.method} ${req.originalUrl}`);
  next();
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// Root & Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    product: 'WORKPULSE — Smart Employee Productivity Tracking System',
    version: '1.0.0-enterprise',
    timestamp: new Date().toISOString(),
  });
});

// Serve production static build if available
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  const indexHtml = path.join(distPath, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) {
      res.send('WORKPULSE Enterprise API Server Running. Client build not found.');
    }
  });
});

// Start Server & attempt MongoDB connect
const startServer = async () => {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 WORKPULSE Enterprise Backend is LIVE on port ${PORT}`);
    console.log(`🌐 API Endpoints active at: http://0.0.0.0:${PORT}/api`);
    console.log(`=======================================================`);
  });
};

startServer();

