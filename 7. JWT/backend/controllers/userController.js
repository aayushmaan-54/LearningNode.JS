const crypto = require('node:crypto');

const app = require('express')();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

const { usersCollection } = require('../model/userSchema');
const {
  generateTemporaryToken,
  hashToken,
  generatePersistentToken
} = require('../utils/jwt');
const sendEmail = require('../utils/sendEmail');
const { UserAuthToken } = require('../model/tokenSchema');




// POST: /api/users/register
/* 
  Request body:
  {
    "name": "john.doe45",
    "email": "john_doe45@gmail.com",
    "password": "johndoe45"
  }
*/
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields!' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const user = await usersCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use!' })
    }

    let userAgents = [];
    const userAgent = req.get('User-Agent');
    if (!userAgents.includes(userAgent)) {
      userAgents.push(userAgent);
    }

    const newUser = await usersCollection.create({
      name,
      email,
      password,
      userAgent: userAgents
    });

    const token = generateTemporaryToken(newUser._id);

    res.cookie('token', token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const { _id, phoneNumber, bio, photo, role, isVerified } = newUser;

    return res.status(201).json({
      _id,
      name,
      email,
      phoneNumber,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid User data!' });
  }
};



// GET: /api/users/login
/* 
  Request body:
  {
    "email": "john_doe45@gmail.com",
    "password": "johndoe45",
    "rememberMe": false
  }
*/
const loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password || rememberMe === undefined) {
    return res.status(400).json({ message: 'Required field is missing!' });
  }

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found, signup!' });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    return res.status(400).json({ message: 'Password is invalid!' });
  }

  const userAgent = req.get('User-Agent');
  const allowedAgent = user.userAgent.includes(userAgent);

  if (!allowedAgent) {
    const loginCode = Math.floor(1_00_000 + Math.random() * 9_00_000); // 6 digit code
    console.log('Login Code: ', loginCode);

    const encryptLoginCode = cryptr.encrypt(loginCode.toString());

    let Usertoken = await UserAuthToken.findOne({ userId: user._id });
    if (Usertoken) {
      await Usertoken.deleteOne(); // remove any existing old login code
    }

    await new UserAuthToken({
      userId: user._id,
      loginToken: encryptLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
    }).save();

    return res.status(400).json({ message: 'New browser or device detected!' });
  }

  let token;
  if (rememberMe) {
    token = generatePersistentToken(user._id);
  } else {
    token = generateTemporaryToken(user._id);
  }

  if (user && passwordIsCorrect) {
    res.cookie('token', token, {
      expires: rememberMe
        ? new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        : new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const { _id, name, email, phoneNumber, bio, photo, role, isVerified } = user;

    return res.status(201).json({
      _id,
      name,
      email,
      phoneNumber,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  } else {
    return res.status(400).json({ message: 'Something went wrong, please try again!' });
  }
}



// GET: /api/users/logout
const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during logout. Please try again." });
  }
}



// GET: /api/users/getUserProfile - (JWT Token Required)
const getUserProfile = async (req, res) => {
  const user = await usersCollection.findOne(req.user._id);

  if (user) {
    const { _id, name, email, phoneNumber, bio, photo, role, isVerified } = user;

    return res.status(201).json({
      _id,
      name,
      email,
      phoneNumber,
      bio,
      photo,
      role,
      isVerified,
    });
  } else {
    return res.status(404).json({ message: "User not found!" });
  }
}



// PATCH: /api/users/updateUser - (JWT Token Required)
/* 
  Request body:
  {
    "name": "john.doe",
    "bio": "Just a tech enthusiast exploring the world of coding.",
    "phoneNumber": "9876543210",
    "photo": "https://example.com/photo.jpg"
  }
*/
const updateUser = async (req, res) => {
  const user = await usersCollection.findById(req.user._id);

  if (user) {
    const { name, email, phoneNumber, bio, photo, role, isVerified } = user;

    user.email = email;
    user.name = req.body.name || name;
    user.bio = req.body.bio || bio;
    user.phoneNumber = req.body.phoneNumber || phoneNumber;
    user.photo = req.body.photo || photo;

    const updateUser = await user.save();

    return res.status(201).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      phoneNumber: updateUser.phoneNumber,
      bio: updateUser.bio,
      photo: updateUser.photo,
      role: updateUser.role,
      isVerified: updateUser.isVerified,
    });
  } else {
    return res.status(404).json({ message: "User not found!" });
  }
}



// DELETE: /api/users/:userId - (JWT Token + ADMIN ACCESS Required)
const deleteUser = async (req, res) => {
  const user = usersCollection.findById(req.params.UserId);

  if (!user) {
    return res.status(404).json('User not found!, please signup!');
  }

  await user.deleteOne();
  return res.status(200).json({ message: 'User deleted successfully!' });
}



// GET: /api/users/getAllUsers - (JWT Token + ADMIN ACCESS Required)
const getAllUsers = async (req, res) => {
  const users = await usersCollection
    .find({})
    .sort('-createdAt')
    .select('-password');

  if (!users) {
    return res.status(500).json({ message: 'No user found!' });
  }

  return res.status(200).json(users);
}



// GET: /api/users/getLoginStatus 
const getLoginStatus = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  } else {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  }
}



// POST: /api/users/updateUserRole - (JWT Token + ADMIN ACCESS Required)
/* 
  Request body:
  {
    "id": :userId,
    "role": "admin"
  }
*/
const updateUserRole = async (req, res) => {
  const { role, id } = req.body;

  const user = await usersCollection.findById(id);
  if (!user) {
    return res.status(500).json({ message: 'No user found!' });
  }

  user.role = role;
  await user.save();

  return res.status(200).json({ message: `User role changed to ${role} successfully!` })
}



// POST: /api/users/sendAutomatedEmail - (JWT Token Required)
/* 
  Request body:
  {
    "subject": 670a541f9d83d4a054ace412,
    "send_to": "john_doe45@gmail.com",
    "reply_to": "noreply@gmail.com",
    "template": "handleBarTempelateName",
  }
*/
const sendAutomatedEmail = async (req, res) => {
  const {
    subject,
    send_to,
    reply_to,
    template,
    url
  } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    return res.status(500).json({ message: 'Missing email parameter' });
  }

  const user = await usersCollection.findOne({ email: send_to });

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  const send_from = process.env.SENDER_EMAIL;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );

    return res.status(200).json({ message: 'Email Sent!' });
  } catch (error) {
    return res.status(500).json({ message: 'Email not sent, please try again!' });
  }
}



// /api/users/sendVerificationEmail - (JWT Token Required)
const sendVerificationEmail = async (req, res) => {
  const user = await usersCollection.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  if (user.isVerified) {
    return res.status(404).json({ message: 'User already verified!' });
  }

  let token = await UserAuthToken.findOne({ userId: user._id })

  if (token) {
    await token.deleteOne();
  }

  const verificationToken = crypto.randomBytes(64).toString('hex') + user._id;

  const hashedVerificationToken = hashToken(verificationToken);

  await new UserAuthToken({
    userId: user._id,
    verificationToken: hashedVerificationToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hrs
  }).save();

  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`

  const subject = 'Verify your Account - ://AuthN';
  const send_to = user.email;
  const send_from = process.env.SENDER_EMAIL;
  const reply_to = 'noreply@aayushmaan.com';
  const template = 'emailVerification';
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );

    return res.status(200).json({ message: 'Verification Email Sent!' });
  } catch (error) {
    return res.status(500).json({ message: 'Email not sent, please try again!' });
  }
}



// PATCH: /api/users/verifyUser/:verificationToken
const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  const hashedToken = hashToken(verificationToken);

  const userToken = await UserAuthToken.findOne({
    verificationToken: hashedToken,
    expiresAt: { $gt: Date.now() }
  });

  if (!userToken) {
    return res.status(404).json({ message: 'Invalid or Expired Token!' });
  }

  const user = await usersCollection.findOne({ _id: userToken.userId });

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: 'User is already verified!' });
  }

  user.isVerified = true;
  await user.save();

  return res.status(200).json({ message: 'Email Verification Successful!' });
}



// POST: /api/users/forgotPassword
/* 
  Request body:
  {
    "email": "john_doe45@gmail.com"
  }
*/
const sendForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  let token = await UserAuthToken.findOne({ userId: user._id })

  if (token) {
    await token.deleteOne();
  }

  const passwordResetToken = crypto.randomBytes(64).toString('hex') + user._id;

  const hashedPasswordResetToken = hashToken(passwordResetToken);

  await new UserAuthToken({
    userId: user._id,
    passwordResetToken: hashedPasswordResetToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 1 * 60 * 60 * 1000 // 1 hrs
  }).save();

  const passwordResetUrl = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`

  const subject = 'Password Reset request - ://AuthN';
  const send_to = user.email;
  const send_from = process.env.SENDER_EMAIL;
  const reply_to = 'noreply@aayushmaan.com';
  const template = 'forgotPassword';
  const name = user.name;
  const link = passwordResetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );

    return res.status(200).json({ message: 'Password Reset Email Sent!' });
  } catch (error) {
    return res.status(500).json({ message: 'Email not sent, please try again!' });
  }
}



// PATCH: /reset-password/:resetToken
/* 
  Request body:
  {
    "password": "password@123"
  }
*/
const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const hashedToken = hashToken(resetToken);

  const userToken = await UserAuthToken.findOne({
    passwordResetToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(404).json({ message: "Invalid or Expired Token" });
  }

  const user = await usersCollection.findOne({ _id: userToken.userId });

  user.password = password;
  await user.save();

  return res.status(200).json({ message: "Password Reset Successful, please login" });
};



// PATCH: /api/users/changePassword - (JWT Token Required)
/* 
  Request body:
  {
    "oldPassword": "password@123",
    "newPassword": "password_123"
  }
*/
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await usersCollection.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Please enter old and new password!' });
  }

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (isPasswordCorrect) {
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password Changed Successfully! Please re-login.' });

    const passwordChangeUrl = `${process.env.FRONTEND_URL}/change-password`

    const subject = 'Password Changed Successfully - ://AuthN';
    const send_to = user.email;
    const send_from = process.env.SENDER_EMAIL;
    const reply_to = 'noreply@aayushmaan.com';
    const template = 'changePassword';
    const name = user.name;
    const link = passwordChangeUrl;

    try {
      await sendEmail(
        subject,
        send_to,
        send_from,
        reply_to,
        template,
        name,
        link
      );
    } catch (error) {
      return res.status(500).json({ message: 'Email not sent, please try again!' });
    }
  } else {
    return res.status(400).json({ message: 'Old Password Invalid!' });
  }
};



// PATCH: /api/users/sendLoginCode/:emailAddress
const sendLoginCode = async (req, res) => {
  const { email } = req.params;
  const user = await usersCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  const userToken = await UserAuthToken.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    return res.status(404).json({ message: 'Invalid or Expired Token, please login again' });
  }

  const loginCode = userToken.loginToken;
  const decryptedLoginCode = cryptr.decrypt(loginCode);

  const subject = 'New Login Detected from Different Device - ://AuthN';
  const send_to = email;
  const send_from = process.env.SENDER_EMAIL;
  const reply_to = 'noreply@aayushmaan.com';
  const template = 'loginCode';
  const name = user.name;
  const link = decryptedLoginCode;

  try {
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    return res.status(200).json({ message: `Access code sent to ${email}` });
  } catch (error) {
    return res.status(500).json({ message: "Email not sent, please try again" });
  }
};



// POST: /api/users/loginWithCode/:emailAddress
/* 
  Request body:
  {
    "loginCode": "603150"
  }
*/
const loginWithCode = async (req, res) => {
  const { email } = req.params;
  const { loginCode, rememberMe } = req.body;

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  const userToken = await UserAuthToken.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() }
  });

  if (!userToken) {
    return res.status(404).json({ message: 'Invalid or expired token' });
  }

  const decryptedLoginCode = cryptr.decrypt(userToken.loginToken);

  if (loginCode !== decryptedLoginCode) {
    return res.status(400).json({ message: 'Incorrect Login Code, try again' });
  } else {
    const userAgent = req.get('User-Agent');
    if (!user.userAgent.includes(userAgent)) {
      user.userAgent.push(userAgent);
      await user.save();
    }

    let token;
    if (rememberMe) {
      token = generatePersistentToken(user._id);
    } else {
      token = generateTemporaryToken(user._id);
    }

    res.cookie('token', token, {
      expires: rememberMe
        ? new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        : new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const { _id, name, phoneNumber, bio, photo, role, isVerified } = user;

    return res.status(200).json({
      _id,
      name,
      email,
      phoneNumber,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
}



// POST: /api/users/google/callback
/* 
  Request body:
  {
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
*/
const loginUsingGoogle = async (req, res) => {
  const { userToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.OAUTH_CLIENT_ID
  });

  const payload = ticket.getPayload();
  const { name, email, picture, sub } = payload;
  const password = Date.now() + sub;

  const user = await usersCollection.findOne({ email });

  let userAgents = [];
  const userAgent = req.get('User-Agent');
  if (!userAgents.includes(userAgent)) {
    userAgents.push(userAgent);
  }

  if (!user) {
    const newUser = await usersCollection.create({
      name,
      email,
      password,
      photo: picture,
      isVerified: true,
      userAgent: userAgents,
    });

    if (newUser) {
      const token = generateTemporaryToken(newUser._id);
      res.cookie('token', token, {
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      const { _id, name, email, phoneNumber, bio, photo, role, isVerified } = newUser;
      res.status(201).json({
        _id,
        name,
        email,
        phoneNumber,
        bio,
        photo,
        role,
        isVerified,
        token,
      });
    }
  }

  if (user) {
    const token = generateTemporaryToken(user._id);
    res.cookie('token', token, {
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const { _id, name, email, phoneNumber, bio, photo, role, isVerified } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phoneNumber,
      bio,
      photo,
      role,
      isVerified,
      token,
    });
  }
}


module.exports = {
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
};