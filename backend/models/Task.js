// Path: backend/models/Task.js

const mongoose = require('mongoose');

// Define the schema for a task
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'], // Allowed status values
    default: 'Pending' // Default status
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Task', taskSchema);
