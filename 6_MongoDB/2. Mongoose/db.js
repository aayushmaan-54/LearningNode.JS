const { default: mongoose, Schema } = require("mongoose")
const mongoURI = `mongodb://localhost:27017/Learning`;

async function main() {
  await mongoose.connect(mongoURI);
  console.log("Database Connected!");
}
main().catch(err => console.log(err));

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String, // shorthand for { type: String }
  pageCount: Number,
  yearPublished: { 
    type: Number, 
    min: [1000, 'Year is too old!'],
    max: [new Date().getFullYear(), 'Year cannot be in the future!']
  },
  genres: [ String ],
  publisher: {
    name: String,
    location: String,
  },
});

exports.Book = mongoose.model('Book', bookSchema); // this creates a mongoose model based on schema, this model is class that interacts with collection 