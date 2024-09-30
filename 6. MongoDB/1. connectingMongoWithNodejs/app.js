const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const PORT = 3000;
let db;
const collection = 'Books';

connectToDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  } else {
    db = getDb();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
});

app.get('/', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database connection not established' });
  }

  const page = req.query.page || 0;
  const booksPerPage = 2;

  db.collection(collection)
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .toArray()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

app.get('/book/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection(collection)
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: 'Could not fetch!' });
      });
  } else {
    res.status(400).json({ error: 'Not a valid book ID!' });
  }
});

app.post('/book', (req, res) => {
  const book = req.body;

  db.collection(collection)
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: 'Could not create a new document!' });
    });
});

app.delete('/book/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection(collection)
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Book deleted' });
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: 'Could not delete document' });
      });
  } else {
    res.status(400).json({ error: 'Not a valid book ID!' });
  }
});

app.patch('/book/:id', (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection(collection)
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Book updated' });
        } else {
          res.status(404).json({ error: 'Book not found or no changes made' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: 'Could not update document' });
      });
  } else {
    res.status(400).json({ error: 'Not a valid book ID!' });
  }
});
