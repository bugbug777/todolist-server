const User = require('../models/UserModel');
const { AppError, AsyncErrorHandler } = require('../services/errorHandler');

const getUsers = AsyncErrorHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json({
    status: 'success',
    users
  });
})
const addUser = AsyncErrorHandler(async (req, res, next) => {
  let {email, name, password, confirmPassword} = req.body;

  if (!email || !name || !password) return AppError(400, '資料欄位不能為空！', next);
  const newUser = await User.create({
    email,
    name,
    password
  });

  res.json({
    status: 'success',
    user: newUser
  })
})

module.exports = {
  getUsers,
  addUser
}