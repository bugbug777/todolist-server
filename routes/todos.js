var express = require('express');
var router = express.Router();
const TodoController = require('../controllers/todos');

router.get('/', TodoController.getTodos);
router.post('/', TodoController.addTodo);

module.exports = router;