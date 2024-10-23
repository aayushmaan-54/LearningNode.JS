import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import toast from 'react-hot-toast';



const initialState = {
  isLoggedIn: false,
  loginStatus: false,
  user: null,
  users: [],
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: true,
  message: '',
  verifiedUsers: 0,
  suspendedUsers: 0
}


// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.registerUser(userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Login User
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.loginUser(userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Logout User
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await authService.logoutUser();
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Login Status
export const isUserLoggedIn = createAsyncThunk(
  'auth/isUserLoggedIn',
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus();
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get User Profile
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, thunkAPI) => {
    try {
      return await authService.getUserProfile();
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update User Profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUserProfile(userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Send Email Verification
export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (_, thunkAPI) => {
    try {
      return await authService.sendVerificationEmail();
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Verify User
export const verifyUser = createAsyncThunk(
  'auth/verifyUser',
  async (userVerificationToken, thunkAPI) => {
    try {
      return await authService.verifyUser(userVerificationToken);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Change Password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.changePassword(userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Send Forgot Password Email
export const sendforgotPasswordEmail = createAsyncThunk(
  'auth/forgotPassword',
  async (userData, thunkAPI) => {
    try {
      return await authService.sendforgotPasswordEmail(userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Forgot Password (Reset Password)
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ resetPasswordToken, userData }, thunkAPI) => {
    try {
      return await authService.resetPassword(resetPasswordToken, userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get All Users
export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (_, thunkAPI) => {
    try {
      return await authService.getAllUsers();
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Delete User
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId, thunkAPI) => {
    try {
      return await authService.deleteUser(userId);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Update User Role
export const updateUserRole = createAsyncThunk(
  'auth/updateUserRole',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUserRole(userData);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Send Login Code (2FA) in Email
export const sendLoginCode = createAsyncThunk(
  'auth/sendLoginCode',
  async (email, thunkAPI) => {
    try {
      return await authService.sendLoginCode(email);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Login with Access Code
export const loginWithCode = createAsyncThunk(
  'auth/loginWithCode',
  async ({ email, rememberMe, accessCode }, thunkAPI) => {
    try {
      return await authService.loginWithCode({ email, rememberMe, accessCode });
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Login Using Google
export const loginUsingGoogle = createAsyncThunk(
  'auth/loginUsingGoogle',
  async (userToken, thunkAPI) => {
    try {
      return await authService.loginUsingGoogle(userToken);
    } catch (err) {
      const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET(state) {
      state.twoFactor = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },

    CALC_VERIFIED_USERS(state, action) {
      const array = []; 

      state.users.map((user) => {
        const { isVerified } = user;
        return array.push(isVerified);
      });

      let count = 0;
      array.forEach((item) => {
        if(item === true) {
          count++;
        }
      })

      state.verifiedUsers = count;
    },

    CALC_SUSPENDED_USERS(state, action) {
      const array = []; 

      state.users.map((user) => {
        const { role } = user;
        return array.push(role);
      });

      let count = 0;
      array.forEach((item) => {
        if(item === 'suspended') {
          count++;
        }
      })

      state.suspendedUsers = count;
    }
  },
  extraReducers: (builder) => {
    builder
      // User Registration
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.loginStatus = true;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success('Registration successful!');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isSuccess = true;
        state.loginStatus = true;
        state.user = action.payload;
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
        if(action.payload.includes('New browser')) {
          state.twoFactor = true;
        }
      })
      
      // Logout User
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.loginStatus = false;
        state.isSuccess = true;
        state.user = null;
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Login Status
      .addCase(isUserLoggedIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isUserLoggedIn.fulfilled, (state, action) => {
        state.loginStatus = action.payload;
        state.isLoading = false;
        state.isLoggedIn = action.payload;
        state.isSuccess = true;
      })
      .addCase(isUserLoggedIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success('Profile Updated Successfully!');
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Send Verification Email
      .addCase(sendVerificationEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Verify User
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Forgot Password
      .addCase(sendforgotPasswordEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendforgotPasswordEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendforgotPasswordEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Forgot Password (Reset Password)
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Send Login Code (2FA) in Email
      .addCase(sendLoginCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      
      // Login with access code
      .addCase(loginWithCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loginStatus = true;
        state.twoFactor = false;
        toast.success(action.payload);
      })
      .addCase(loginWithCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })
      
      // Login Using Google
      .addCase(loginUsingGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUsingGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.loginStatus = true;
        toast.success('Logged in Successfully!');
      })
      .addCase(loginUsingGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      });
  },
});


export const { RESET, CALC_VERIFIED_USERS, CALC_SUSPENDED_USERS } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;