const { MongoClient } = require('mongodb');

let dbConnection = null;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/testing')
      .then((client) => {
        dbConnection = client.db();
        return cb(); 
      })
      .catch((err) => {
        console.error('Database connection failed:', err);
        return cb(err);
      });
  },

  getDb: () => dbConnection
};