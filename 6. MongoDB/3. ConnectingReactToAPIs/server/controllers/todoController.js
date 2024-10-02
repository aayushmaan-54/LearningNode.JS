const { ObjectId } = require("mongodb");
const { ToDoCollection } = require("../model/TodoSchema");


const todoController = {
  getAllTodos: async (req, res) => {
    try {
      const todos = await ToDoCollection.find({});
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching todos', error: error.message });
    }
  },


  createTodo: async (req, res) => {
    try {
      const newTodo = new ToDoCollection({
        title: req.body.title,
        isCompleted: false,
        date: Date.now(),
      });

      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ msg: 'Error creating todo', error: error.message });
    }
  },


  updateTodo: async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Invalid Todo ID' });
      }

      const todo = await ToDoCollection.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }

      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ msg: 'Error updating todo', error: error.message });
    }
  },


  deleteTodo: async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Invalid Todo ID' });
      }

      const result = await ToDoCollection.findByIdAndDelete(req.params.id);

      if (!result) {
        return res.status(404).json({ msg: 'Todo not found' });
      }

      res.status(200).json({ msg: "Todo deleted successfully", _id: req.params.id });
    } catch (error) {
      res.status(500).json({ msg: 'Error deleting todo', error: error.message });
    }
  }
};


module.exports = todoController;