const { usersCollection } = require('../model/userSchema');
const jwt = require('jsonwebtoken');



const authorizeUserAccess = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'User not authorized, please login' });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (verificationError) {
      return res.status(401).json({ message: 'Invalid token, please login again' });
    }

    const user = await usersCollection.findById(verifyToken.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role === 'suspended') {
      return res.status(403).json({ message: 'User suspended! Please contact support' });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};


const authorizeAdminAccess = async(req, res, next) => {
  if(req.user && req.user.role === 'admin') {
    next()
  } else {
    return res.status(401).json({ message: 'Admin privilege required!' });
  }
}


const authorizeAuthorAccess = async(req, res, next) => {
  if(req.user.role === 'author' ||req.user.role === 'admin') {
    next()
  } else {
    return res.status(401).json({ message: 'Author or Admin privilege required!' });
  }
}


const authorizeVerifiedAccess = async(req, res, next) => {
  if(req.user && req.user.isVerified) {
    next()
  } else {
    return res.status(401).json({ message: 'Account Verification required!' });
  }
}


module.exports = {
  authorizeUserAccess,
  authorizeAdminAccess,
  authorizeAuthorAccess,
  authorizeVerifiedAccess,
}