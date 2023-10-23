const Todo = require("../models/Todo");

exports.addtodo = async (req, res) => {
  try {
    const {
      title,
      description,
      deadlineYear,
      deadlineMonth,
      deadlineDay,
      done,
    } = req.body;
    const todo = await new Todo({
      title,
      description,
      deadlineYear,
      deadlineMonth,
      deadlineDay,
      done,
    }).save();
    res.json(todo);
  } catch (error) {
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

exports.deletetodo = async (req, res) => {
  const { entryId } = req.body;
  try {
    await Todo.findByIdAndDelete(entryId);
    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry." });
  }
};

exports.updatetodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadlineYear, deadlineMonth, deadlineDay, done } =
    req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        deadlineYear,
        deadlineMonth,
        deadlineDay,
        done,
      },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Error updating todo" });
  }
};
