require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const { connectToDatabase } = require('./config/db');
const userRoutes = require('./router/route');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: [ 'http://localhost:5173', 'https://authn-app.vercel.app', 'http://localhost:5174' ], credentials: true }));

  
  
app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
  res.send('Hello, World! 🌏');
});



connectToDatabase().then(() => {
  app.listen(PORT, () =>  {
    console.log(`Server is listening on "http://localhost:${PORT}"`);
  });
}) .catch(err => {
  console.error("Failed to Connect to database: ", err);
});