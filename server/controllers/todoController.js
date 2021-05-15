const db = require("../models/todoModels");

const todoController = {};

todoController.getTodo = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM todo");
    console.log(result);
    res.locals.list = result.rows;
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

todoController.addTodo = async (req, res, next) => {
  try {
    const { message } = req.body;
    const result = await db.query(
      "INSERT INTO todo(message) VALUES($1) RETURNING *",
      [message]
    );
    res.locals.newToDo = result.rows[0];
    next();
  } catch (e) {
    console.log("addTodo", e);
    next(e);
  }
};

todoController.deleteTodo = async (req, res, next) => {
  // write code here
  try {
    const { todo_id } = req.body;
    console.log("body", todo_id);

    const todo = `DELETE FROM public."todo" WHERE todo_id =($1) RETURNING *`;
    const result = await db.query(todo, [todo_id]);
    res.locals.deletedTodo = result.rows[0];
    console.log(res.locals.deletedTodo);
    next();
  } catch (err) {
    console.log("deleted Todo", err);
  }
};

module.exports = todoController;
