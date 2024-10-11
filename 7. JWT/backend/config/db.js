require('dotenv').config();

const { ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');

const Mongo_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/auth-app";

const options = {
  serverAPI: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecateErrors: true
  }
}


async function connectToDatabase() {
  try {
    await mongoose.connect(Mongo_URI, options);
    console.log("Database Connected!");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
}


module.exports = { connectToDatabase };