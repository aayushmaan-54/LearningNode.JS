const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;


const usersSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'] 
  },

  email: {
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true, 
    trim: true, 
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },

  password: { 
    type: String, 
    required: [true, 'Please add a password'] 
  },

  photo: { 
    type: String, 
    required: [true, 'Please add a photo'], 
    default: 'https://raw.githubusercontent.com/aayushmaan-54/LearningNode.JS/refs/heads/main/7.%20JWT/frontend/public/profile.png' 
  },

  phoneNumber: { type: String },

  bio: { type: String },

  isVerified: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    required: true,
    default: 'subscriber' // [subscriber, author, admin, suspended]
  },

  userAgent: {
    type: [String],
    required: true,
    default: []
  }
}, 

{
  timestamps: true,
  minimize: false
});


usersSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});



exports.usersCollection = mongoose.model('auth-user', usersSchema, 'auth-users');