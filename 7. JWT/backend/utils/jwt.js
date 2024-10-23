const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const generatePersistentToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


const generateTemporaryToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token.toString())
    .digest('hex');
}


module.exports = {
  generatePersistentToken,
  generateTemporaryToken,
  hashToken,
}