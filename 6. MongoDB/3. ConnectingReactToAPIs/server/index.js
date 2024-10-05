require('dotenv').config();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
const express = require('express');
const app = express();

const router = require('./routes/router');
const { connectToDatabase } = require('./config/db');


app.use(cors());
app.use(express.json());
app.use ('/api', router);



connectToDatabase().then(() => {
  app.listen(PORT, () =>  {
    console.log(`Server is listening on "http://localhost:${PORT}"`);
  });
}) .catch(err => {
  console.error("Failed to Connect to database: ", err);
});
