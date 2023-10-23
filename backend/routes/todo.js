const express = require("express");
const {
  addtodo,
  getTodos,
  deletetodo,
  updatetodo,
} = require("../controllers/todo");

const router = express.Router();
router.post("/addtodo", addtodo);
router.get("/todos", getTodos);
router.post("/deletetodo", deletetodo);
router.patch("/updatetodo/:id", updatetodo);

module.exports = router;
