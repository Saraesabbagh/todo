const Todo = require("../models/Todo");

exports.addtodo =async (req,res)=>{
  try {
    const {
        title,
        description,
        deadlineYear,
        deadlineMonth,
        deadlineDay,
        done,
      }= req.body
      const todo = await new Todo({
        title,
        description,
        deadlineYear,
        deadlineMonth,
        deadlineDay,
        done,
      }).save();
      res.json(todo);
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodos = async (req, res) => {
    try {
      // Retrieve all todos from the database
      const todos = await Todo.find();
      res.json(todos); // Send the array of todos as a JSON response
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


