// Path: backend/routes/task.js

const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksForUser,
  updateTaskStatus,
  getAllUsers,
  getAllTasks,
  addUser,
  editUser,
  deleteUser
} = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

// Admin: Manage users
router.get('/admin/users', auth(['admin']), getAllUsers);
router.post('/admin/users', auth(['admin']), addUser);
router.put('/admin/users/:id', auth(['admin']), editUser);
router.delete('/admin/users/:id', auth(['admin']), deleteUser);

// Admin: Create and view tasks
router.post('/tasks', auth(['admin']), createTask);
router.get('/admin/tasks', auth(['admin']), getAllTasks);

// Users: View and update assigned tasks
router.get('/user-tasks', auth(['user', 'admin']), getTasksForUser);
router.put('/tasks/:id', auth(['user', 'admin']), updateTaskStatus);

module.exports = router;
