const express = require('express');
const router = express.Router();

const { 
  userRegister, 
  loginUser, 
  logoutUser, 
  getUserProfile, 
  updateUser, 
  deleteUser,
  getAllUsers,
  getLoginStatus,
  updateUserRole,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  sendForgotPasswordEmail,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  loginUsingGoogle
} = require('../controllers/userController');
const { 
  authorizeUserAccess, 
  authorizeAdminAccess 
} = require('../middleware/authMiddleware');


router
  .get('/logout', logoutUser)
  .get('/getUserProfile', authorizeUserAccess, getUserProfile)
  .get('/getAllUsers', authorizeUserAccess, authorizeAdminAccess, getAllUsers)
  .get('/getLoginStatus', getLoginStatus)
  .post('/register', userRegister)
  .post('/login', loginUser)
  .post('/updateUserRole', authorizeUserAccess, authorizeAdminAccess, updateUserRole)
  .post('/sendAutomatedEmail', authorizeUserAccess, sendAutomatedEmail)
  .post('/sendVerificationEmail', authorizeUserAccess, sendVerificationEmail)
  .post('/forgotPassword', sendForgotPasswordEmail)
  .post('/loginWithCode/:email', loginWithCode)
  .post('/google/callback', loginUsingGoogle)
  .patch('/updateUser', authorizeUserAccess, updateUser)
  .patch('/verifyUser/:verificationToken', verifyUser)
  .patch('/reset-password/:resetToken', resetPassword)
  .patch('/changePassword', authorizeUserAccess, changePassword)
  .patch('/sendLoginCode/:email', sendLoginCode)
  .delete('/:UserId', authorizeUserAccess, authorizeAdminAccess, deleteUser)


module.exports = router;