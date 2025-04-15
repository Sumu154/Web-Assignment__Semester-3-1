const express = require('express');
const router = express.Router();
const { 
  createUser, 
  getUsers, 
  getUserById, 
  getUserByEmail, 
  updateUserRoleAdmin, 
  getUserRole,
  getUserImage,
  getTotalUsers
} = require('../controllers/userControllers');


// create a user -> post
router.post('/users', createUser);
// show all users -> get
router.get('/users', getUsers);


// get users by email
router.get('/users/user_email/:user_email', getUserByEmail) //ekta specific email er info
// get users by id
router.get('/users/:user_id', getUserById);

// get user role
router.get('/users/:user_email/user_role', getUserRole)
// get user image
router.get('/users/:user_email/user_image', getUserImage);
// get user role
router.patch('/users/:user_email/user_role', updateUserRoleAdmin)

// get total users
router.get('/totalUsers', getTotalUsers)


module.exports = router;