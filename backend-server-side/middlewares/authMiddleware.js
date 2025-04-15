const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  //console.log('middleware token', token);
  if(!token){
    return res.status(403).send('Access denied. No token found');
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //console.log('decoded', decoded);
    next();
  }
  catch(e){
    res.status(401).send('Invalid or expired token');
  }
};

module.exports = { 
  verifyToken
} 