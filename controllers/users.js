const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError, AsyncErrorHandler } = require('../services/errorHandler');

const checkStatus = AsyncErrorHandler(async (req, res, next) => {
  res.json({
    status: 'success',
    user: req.user
  });
})

const getUsers = AsyncErrorHandler(async (req, res, next) => {
  const users = await User.find({});
  res.json({
    status: 'success',
    users
  });
})
const deleteUsers = AsyncErrorHandler(async (req, res, next) => {
  await User.deleteMany({});
  res.json({
    status: 'success',
    users: []
  });
})
const addUser = AsyncErrorHandler(async (req, res, next) => {
  let {email, name, password, confirmPassword} = req.body;
  password = validator.trim(password);

  if (!email || !name || !password) return AppError(400, '資料欄位不能為空！', next);
  if (!validator.isEmail(email)) return AppError(400, '電子信箱不符合格式！', next);
  if (await User.findOne({email})) return AppError(400, '該電子信箱已註冊！', next);
  if (!validator.isLength(name, {min:2})) return AppError(400, '暱稱欄位必須輸入至少兩個字元以上！', next);
  if (!validator.isLength(password, {min:8, max:16})) return AppError(400, '密碼長度必須介於 8 到 16 個字元之間！', next);
  if (password !== confirmPassword) return AppError(400, '密碼前後不一致！', next);

  // 使用 bcrypt 加密密碼
  password = await bcrypt.hash(password, 8);

  const newUser = await User.create({
    email,
    name,
    password
  });
  newUser.password = undefined;
  
  // 取得 JWT
  const token = await jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
  
  res.status(201).json({
    status: 'success',
    user: newUser,
    token
  })
})
const signIn = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email}).select('+password');

  if (!email || !password) return AppError(400, '資料欄位不能為空！', next);
  if (!validator.isEmail(email)) return AppError(400, '電子信箱不符合格式！', next);
  if (!user) return AppError(400, '找不到該使用者！', next);
  const isChecked = await bcrypt.compare(password, user.password);
  if (!isChecked) return AppError(400, '帳號或密碼錯誤請重新嘗試！', next);

  const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}); 
  user.password = undefined;

  res.json({
    status: 'success',
    user,
    token
  })
})

module.exports = {
  checkStatus,
  getUsers,
  deleteUsers,
  addUser,
  signIn
}