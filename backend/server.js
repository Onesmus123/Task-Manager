// Path: backend/server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes'); // Authentication routes
const taskRoutes = require('./routes/task'); // Admin/user and task routes

const app = express();
connectDB(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Routes for login and registration
app.use('/api', taskRoutes); // Routes for tasks and user management

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
