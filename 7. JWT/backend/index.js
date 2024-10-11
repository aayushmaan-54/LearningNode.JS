require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { connectToDatabase } = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://authn-app.vercel.app'
  ],
  credentials: true
}));


app.get('/', (req, res) => {
  res.send('HOME PAGE!');
})



const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () =>  {
    console.log(`Server is listening on "http://localhost:${PORT}"`);
  });
}) .catch(err => {
  console.error("Failed to Connect to database: ", err);
});