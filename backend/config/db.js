// Path: backend/config/db.js

require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

// Connect to MongoDB using async/await
const connectDB = async () => {
  try {
    await mongoose.connect(uri); // Connect to MongoDB
    console.log('MongoDB connected');
  } catch (err) {
    // Log error and exit process if connection fails
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Export the connection function for use in server.js
module.exports = connectDB;
