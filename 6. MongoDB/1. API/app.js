const express = require('express');
const server = express();
const { connectToDb, getDb } = require('./db');
const PORT = 3000;
let db;


server.get('/', (req, res) => {
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .toArray()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'could not fetch the documents' });
    });
});
// db.books, .find() & sort() method returns cursor which is set of object that points to documents that is outlined by query, without args in find() its gonna point to whole collection, but if we add filter its gonna point to subset of docs, it has 2 methods we can use toArray(fetches all docs) & forEach(fetches batch by batch if batch is exhausetd it moves to next batch by default mongo db have 100 batch) 

connectToDb((err) => {
  if(!err) {
    server.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } 

  db = getDb();
})