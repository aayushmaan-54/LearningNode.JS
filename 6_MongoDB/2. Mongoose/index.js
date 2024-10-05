const express = require('express');
const { Book } = require('./db');
const app = express();
app.use(express.json());
const PORT = 3000;

app.get('/', async (req, res) => {
  res.json(await Book.find({}));
})

app.get('/book/:id', async (req, res) => {
  res.json(await Book.findById(req.params.id));
})

app.post('/book', async (req, res) => {
  // const book = new Book({
  //   title: 'To Kill a Mockingbird',
  //   author: 'Harper Lee',
  //   pageCount: 324,
  //   yearPublished: 1960,
  //   genres: ['Fiction', 'Classic'],
  //   publisher: {
  //     name: 'J.B. Lippincott & Co.',
  //     location: 'Philadelphia',
  //   }
  // });
  // book.author = "Albert Einstein"

  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save the book' }); 
  }
});

app.put('/book/:id', async (req, res) => {
  const doc = await Book.findOneAndReplace({ _id: req.params.id }, req.body, {new: true});
  res.status(201).json(doc);
})

app.patch('/book/:id', async (req, res) => {
  try {
    const doc = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(201).json(doc)
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
})

app.delete('/book/:id', async (req, res) => {
  try {
    const doc = await Book.findOneAndDelete({ _id: req.params.id }, req.body);
    res.status(201).json(doc)
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});