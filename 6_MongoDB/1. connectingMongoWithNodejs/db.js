const { MongoClient } = require('mongodb');

let dbConnection = null;


// ***** MONGO COMPASS *****
const dbUrl = `mongodb://localhost:27017`
     ,dbName = `Learning`;



// ***** MONGO ATLAS *****
// const dbUrl = `mongodb+srv://aayushmaan_soni:<db_password>@trial.vmsmy.mongodb.net/?retryWrites=true&w=majority&appName=Trial`
//      ,dbName = `testing`;

module.exports = {
  connectToDb: (cb) => { // here cb is optional but is written if we want to run a function cb once the connection is established (or if an error occurs).
    MongoClient.connect(dbUrl) // connect to mongodb
      .then((client) => { // here client is a instance of MongoClient, that acts as a gateway to interact with the MongoDB server(Listing DB, switching DB, CRUD)
        dbConnection = client.db(dbName); // it selects or creates a database, that have methods to interact with selected database collections
        return cb(); 
      })
      .catch((err) => {
        console.error('Database connection failed:', err);
        return cb(err);
      });
  },

  getDb: () => dbConnection
};