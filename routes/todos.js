var express = require('express');
var router = express.Router();
const TodoController = require('../controllers/todos');

router.get('/', TodoController.getTodos);
router.post('/', TodoController.addTodo);
router.delete('/', TodoController.deleteTodos);

module.exports = router;