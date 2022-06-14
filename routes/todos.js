var express = require('express');
var router = express.Router();
const TodoController = require('../controllers/todos');

router.get('/', TodoController.getTodos);
router.post('/', TodoController.addTodo);
router.put('/:todoId', TodoController.editTodo);
router.delete('/', TodoController.deleteTodos);
router.delete('/:todoId', TodoController.deleteTodo);

module.exports = router;