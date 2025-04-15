const userModel = require('../models/userModel')


const createUser = async (req, res) => {
  try{
    // //console.log('post api hitting');
    const user = req.body;

    const createdUser = await userModel.create(user);
    res.status(200).json(createdUser);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}


const getUsers = async (req, res) => {
  try{
    const users = await userModel.find();
    res.status(200).json(users);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
  
}



const getUserById = async (req, res) => {
  try{
    const id = req.params.id;
    // //console.log(id);
    const user = await userModel.findOne( {_id: id} );
    res.status(200).json(user);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}

// get user role
const getUserRole = async (req, res) => {
  try{
    const { user_email } = req.params;
    const user = await userModel.findOne( {user_email} );
    res.status(200).json(user.user_role);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}

// get user image
const getUserImage = async (req, res) => {
  try{
    const { user_email } = req.params;
    const user = await userModel.findOne( {user_email} );
    res.status(200).json(user.user_image);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}

// get user by email
const getUserByEmail = async (req, res) => {
  try{
    const user_email = req.params.user_email;
    // //console.log(user_email);
    const user = await userModel.findOne( {user_email} );
    res.status(200).json(user);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}


//change the user_role
const updateUserRoleAdmin = async (req, res) => {
  try{
    const user_email = req.params.user_email;
    const user_role = req.body.user_role;
    const user = await userModel.findOne({ user_email });
    //console.log(user);

    user.user_role = user_role;
    await user.save();
    res.status(200).json(user);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}



// total user
const getTotalUsers = async (req, res) => {
  try{
    const totalUsers = await userModel.countDocuments();
    res.status(200).json(totalUsers);
  }
  catch(e){
    res.status(500).json({ message: 'Internal server error: ', error:e.message });
  }
}

module.exports = { 
  createUser, 
  getUsers,
  getUserById, 
  getUserByEmail, 
  getUserRole, 
  getUserImage,
  updateUserRoleAdmin,
  getTotalUsers
};
