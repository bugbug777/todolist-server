const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError, AsyncErrorHandler } = require('../services/errorHandler');

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
    })
  })
}

const authCheck = AsyncErrorHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) return AppError(401, '您尚未登入！ ', next);
  const payload = await verifyJWT(token);
  const user = await User.findById(payload.id);
  if (!user) return AppError(400, '該使用者不存在！', next);
  req.user = user;
  
  next();
})

module.exports = {
  verifyJWT,
  authCheck
}