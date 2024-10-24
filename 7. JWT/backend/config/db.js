require('dotenv').config();

const { ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');

const Mongo_URI = process.env.MongoDB_URI;

if (!Mongo_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

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