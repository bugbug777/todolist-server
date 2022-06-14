const User = require('../models/UserModel');
const Todo = require('../models/TodoModel');
const { AsyncErrorHandler, AppError } = require('../services/errorHandler');

const getTodos = AsyncErrorHandler(async (req, res, next) => {
  const todos = await Todo.find();
  res.json({
    status: 'success',
    todos
  })
})

const addTodo = AsyncErrorHandler(async (req, res, next) => {
  const { userId, content, status } = req.body;
  const user = await User.findById(userId);

  if (!user) return AppError(400, '找不到該名使用者！', next);
  if (!content) return AppError(400, '待辦內容不能為空！', next);

  const newTodo = await Todo.create({
    userId,
    content,
    status
  })

  res.json({
    status: 'success',
    todo: newTodo
  })
})

module.exports = {
  getTodos,
  addTodo
}