// Path: backend/controllers/taskController.js

const Task = require('../models/Task');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Create and assign a new task to a user
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo } = req.body;

    // Check if assigned user exists
    const user = await User.findById(assignedTo);
    if (!user) return res.status(404).json({ message: 'Assigned user not found' });

    // Create task
    const task = await Task.create({ title, description, deadline, assignedTo });

    // Send notification email to user
    await sendEmail(user.email, 'New Task Assigned', `Task: ${title}\nDeadline: ${deadline}`);

    res.status(201).json({ message: 'Task created and assigned successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks assigned to the currently logged-in user
exports.getTasksForUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update status of a specific task
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Task.findByIdAndUpdate(id, { status });
    res.json({ message: 'Task status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users with role 'user'
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Basic validation
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email, and password are required' });

    // Prevent duplicate user
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({ name, email, phone, password, role: 'user' });
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit user details
exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks with assigned user info
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
