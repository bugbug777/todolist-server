const Todo = require('../models/Todo');
const { AsyncErrorHandler, AppError } = require('../services/errorHandler');

const getTodos = AsyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  const todos = await Todo.find({ userId });
  res.json({
    status: 'success',
    todos
  })
})

const addTodo = AsyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { content } = req.body;

  if (!content) return AppError(400, '待辦內容不能為空！', next);

  const newTodo = await Todo.create({
    userId,
    content
  })

  res.json({
    status: 'success',
    todo: newTodo
  })
})

const editTodo = AsyncErrorHandler(async (req, res, next) => {
  const { todoId } = req.params;
  const { content } = req.body;
  const todo = await Todo.findById(todoId);

  if (!todo) return AppError(400, '找不到該筆待辦事項！', next);
  if (!content) return AppError(400, '待辦內容不能為空！', next);

  const newTodo = await Todo.findByIdAndUpdate(todo._id, {
    content
  }, { new: true });

  res.json({
    status: 'success',
    todo: newTodo
  })
})

const deleteTodos = AsyncErrorHandler(async (req, res, next) => {
  await Todo.deleteMany({});
  res.json({
    status: 'success',
    todos: []
  })
})

const deleteTodo = AsyncErrorHandler(async (req, res, next) => {
  const { todoId } = req.params;
  const todoDeleted = await Todo.findByIdAndDelete(todoId);

  if (!todoDeleted) return AppError(400, '找不到該筆待辦事項！', next);

  res.json({
    status: 'success',
    todo: todoDeleted
  })
})

module.exports = {
  getTodos,
  addTodo,
  editTodo,
  deleteTodos,
  deleteTodo
}