const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

const createToken = (req, res) => {
  const { user_email } = req.body;
  console.log(user_email);
  const token = jwt.sign({user_email}, process.env.JWT_SECRET, {expiresIn: '24h'});
  res.cookie('token', token, {
   ...cookieOptions
  });
  res.send('successfully token generated');
}


// clear the cookie while logout
const clearToken = (req, res) => {
  res.clearCookie('token', {
    ...cookieOptions,
  });
  res.send('Successfully logged out and cookie removed')
}


// get the cookie
const getToken = (req, res) => {
  const token = req.cookies.token;
  if(token){
    res.send(`token received: ${token} `);
  }
  else{
    res.status(404).send('No token found');
  }
}

module.exports = { createToken, clearToken, getToken };
