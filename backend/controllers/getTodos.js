const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    // Retrieve all todos from the database
    const todos = await Todo.find();
    res.json(todos); // Send the array of todos as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};