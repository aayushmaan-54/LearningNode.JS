const mongoose = require('mongoose');

const { Schema } = mongoose;


const usersSchema = new Schema({

  name: { type: String, required: [true, 'Please add a name'] },

  email: {
    type: String, required: [true, 'Please add an email'], unique: true, trim: true, match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },

  password: { type: String, required: [true, 'Please add a password'] },

  photo: { type: String, required: [true, 'Please add a photo'], default: 'https://drive.google.com/u/0/drive-viewer/AKGpiha_3ziwxgxM65lGauP1EeXywEPFuVGE7efvClEsstgs0NSdnoo65IfnRw9oB3sBzUwZ2cuielzjMe7GIYtIVMoTXLBvijOFJb4=s2560' },

  phoneNumber: { type: String },

  bio: { type: String },

  isVerified: {
    type: Boolean,
    default: false
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


exports.usersCollection = mongoose.model('auth-user', usersSchema, 'auth-users');