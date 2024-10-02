const { Schema, mongoose } = require("mongoose");

const todoSchema = new Schema({
  title: { type: String, required: [ true, "Todo Title is necessary!" ] },
  isCompleted: { type: Boolean, required: true },
  date: { type: Date, required: true }
});


exports.ToDoCollection = mongoose.model('ToDo', todoSchema, 'todos');