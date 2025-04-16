const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getTasks,
  getTaskById, 
  getTaskByEmail, 
  getTaskRole, 
  getTotalTasks 
} = require('../controllers/taskControllers');

// Create a new task
router.post('tasks/', createTask);

// Get all tasks
router.get('tasks/', getTasks);

// Get a task by ID
router.get('tasks/:id', getTaskById);

// Get task by email
router.get('tasks/email/:task_email', getTaskByEmail);

// Get task role by email
router.get('tasks/role/:task_email', getTaskRole);

// Get total number of tasks
router.get('tasks/count/total', getTotalTasks);


module.exports = router;
