const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.get("/", todoController.getTodo, (req, res) => {
  res.status(202).json(res.locals.list);
});

router.post("/", todoController.addTodo, (req, res) => {
  res.status(202).json(res.locals.newToDo);
});

router.delete("/", todoController.deleteTodo, (req, res) => {
  res.status(202).json(res.locals.deletedTodo);
});

module.exports = router;
