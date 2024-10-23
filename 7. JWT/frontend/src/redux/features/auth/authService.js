import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api/users`;


// Validate Email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


// Register User
const registerUser = async(userData) => {
  const res = await axios.post(`${API_BASE_URL}/register`, userData);
  return res.data;
}


// Login User
const loginUser = async(userData) => {
  const res = await axios.post(`${API_BASE_URL}/login`, userData);
  return res.data;
}


// Logout User
const logoutUser = async() => {
  const res = await axios.get(`${API_BASE_URL}/logout`);
  return res.data.message;
}


// Login Status
const getLoginStatus = async() => {
  const res = await axios.get(`${API_BASE_URL}/getLoginStatus`);
  return res.data;
}



// Get User Profile
const getUserProfile = async() => {
  const res = await axios.get(`${API_BASE_URL}/getUserProfile`);
  return res.data;
}


// Update user profile
const updateUserProfile = async(userData) => {
  const res = await axios.patch(`${API_BASE_URL}/updateUser`, userData);
  return res.data;
}


// Send Email Verification
const sendVerificationEmail = async() => {
  const res = await axios.post(`${API_BASE_URL}/sendVerificationEmail`);
  return res.data.message;
}


// Verify User
const verifyUser = async(userVerificationToken) => {
  const res = await axios.patch(`${API_BASE_URL}/verifyUser/${userVerificationToken}`);
  return res.data.message;
}


// Change Password
const changePassword = async(userData) => {
  const res = await axios.patch(`${API_BASE_URL}/changePassword`, userData);
  return res.data.message;
}


// Forgot Password
const sendforgotPasswordEmail = async(userData) => {
  const res = await axios.post(`${API_BASE_URL}/forgotPassword`, userData);
  return res.data.message;
}


// Forgot Password (Reset Password)
const resetPassword = async(resetPasswordToken, userData) => {
  const res = await axios.patch(`${API_BASE_URL}/reset-password/${resetPasswordToken}`, userData);
  return res.data.message;
}


// Get All Users
const getAllUsers = async() => {
  const res = await axios.get(`${API_BASE_URL}/getAllUsers`);
  return res.data;
}


// Delete a User
const deleteUser = async(userId) => {
  const res = await axios.delete(`${API_BASE_URL}/${userId}`);
  return res.data.message;
}


// Update User Role
const updateUserRole = async(userData) => {
  const res = await axios.post(`${API_BASE_URL}/updateUserRole`, userData);
  return res.data.message;
}


// Send Login Code (2FA) in Email
const sendLoginCode = async(email) => {
  const res = await axios.patch(`${API_BASE_URL}/sendLoginCode/${email}`);
  return res.data.message;
}


// Login with Code
const loginWithCode = async ({ email, rememberMe, accessCode }) => {
  const res = await axios.post(`${API_BASE_URL}/loginWithCode/${email}`, {
    loginCode: accessCode,
    rememberMe: rememberMe,
  });
  return res.data;
};


// Login Using Google
const loginUsingGoogle = async (userToken) => {
  const res = await axios.post(`${API_BASE_URL}/google/callback`, userToken);
  return res.data;
};



const authService = {
  registerUser,
  loginUser,
  logoutUser,
  getLoginStatus,
  getUserProfile,
  updateUserProfile,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  sendforgotPasswordEmail,
  resetPassword,
  getAllUsers,
  deleteUser,
  updateUserRole,
  sendLoginCode,
  loginWithCode,
  loginUsingGoogle,
}
export default authService;