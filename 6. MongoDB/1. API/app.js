const express = require('express');
const server = express();
const { connectToDb, getDb } = require('./db');
const PORT = 3000;
let db;

connectToDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); 
  } else {
    db = getDb();

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
});


server.get('/', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database connection not established' });
  }

  db.collection('books')
    .find() 
    .sort({ author: 1 }) 
    .toArray()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
    // db.books, .find() & sort() method returns cursor which is set of object that points to documents that is outlined by query, without args in find() its gonna point to whole collection, but if we add filter its gonna point to subset of docs, it has 2 methods we can use toArray(fetches all docs) & forEach(fetches batch by batch if batch is exhausetd it moves to next batch by default mongo db have 100 batch) 
});