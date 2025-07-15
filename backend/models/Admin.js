// Path: backend/models/Admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema for admin users
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate admin emails
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin', // Role is fixed as 'admin' for this schema
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Hash password before saving admin to DB
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password not modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare plain password with hashed one
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
