// Path: backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register user or admin based on role
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All required fields are needed' });
    }

    const Model = role === 'admin' ? Admin : User;

    const existing = await Model.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: `${role} already exists` });
    }

    const newUser = await Model.create({ name, email, phone, password, role });

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Login for both users and admins
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Try finding user in Admins first, then Users
    let user = await Admin.findOne({ email });
    if (!user) {
      user = await User.findOne({ email });
    }

    if (!user) {
      console.log('No user found with that email');
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};