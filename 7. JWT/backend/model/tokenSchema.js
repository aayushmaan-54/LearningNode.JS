const mongoose = require('mongoose');

const { Schema } = mongoose;


const tokenSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'auth-user'
  },

  verificationToken: { 
    type: String,
    default: '',
  },

  passwordResetToken: { 
    type: String,
    default: '',
  },

  loginToken: { 
    type: String,
    default: '',
  },

  createdAt: { 
    type: Date,
    required: true,
  },

  expiresAt: { 
    type: Date,
    required: true,
  },
});


exports.UserAuthToken = mongoose.model('UserAuthToken', tokenSchema, 'tokens');