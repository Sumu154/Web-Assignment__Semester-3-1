const mongoose = require('mongoose');
const connectDB = require('../config/db');

const userSchema = new mongoose.Schema({
  user_email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    trim: true,
    required: true,
  },
  user_image: {
    type: String,
    trim: true,
  },
  user_role: {
    type: String,
    trim: true,
    default: 'user',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);