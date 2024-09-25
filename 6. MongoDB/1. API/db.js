const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {

  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/testing')
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch(err => {
        console.log("ERROR!: ", err);
        return cb(err);
      })
  },

  getDb: () => dbConnection

}