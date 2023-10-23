const express = require("express");
const { addtodo, getTodos } = require("../controllers/todo");

const router = express.Router();
router.post('/addtodo', addtodo );
router.get('/todos', getTodos);
  
  

module.exports = router;