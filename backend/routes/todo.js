const express = require("express");
const { addtodo, getTodos, deletetodo } = require("../controllers/todo");

const router = express.Router();
router.post("/addtodo", addtodo);
router.get("/todos", getTodos);
router.post("/deletetodo", deletetodo);

module.exports = router;
