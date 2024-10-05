const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");


router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo);

router
  .patch("/todos/:id", todoController.updateTodo)
  .delete("/todos/:id", todoController.deleteTodo);

  
module.exports = router;