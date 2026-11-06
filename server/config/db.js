const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workpulse';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[WorkPulse Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[WorkPulse Database] MongoDB not detected (${error.message}).`);
    console.log(`[WorkPulse Database] Switching to High-Fidelity In-Memory Realtime Engine for instant zero-config operation.`);
    return false;
  }
};

module.exports = connectDB;

