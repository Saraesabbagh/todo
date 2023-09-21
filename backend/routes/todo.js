const express = require("express");
const { addtodo } = require("../controllers/todo");

const router = express.Router();
router.post('/addtodo', addtodo );
// router.get('./todo', todo);

module.exports = router;