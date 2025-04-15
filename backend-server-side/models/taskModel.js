const mongoose = require('mongoose');
const connectDB = require('../config/db');


const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  },
  task_title: {
    type: String,
    required: true,
    trim: true,
  },
  task_description: {
    type: String,
  },
  task_dueDate: {
    type: Date,
  },
  task_priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  task_category: {
    type: String,
  },
  task_completed: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
