var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
var usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/todolist').then((res) => {
  console.log('資料庫連線成功！');
});
var app = express();

process.on('uncaughtException', (err) => {
  console.error('未捕捉異常例外！');
  console.error('錯誤：', err);
  process.exit(1)
})
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉異步異常例外！');
  console.error('原因：', reason);
  console.error('回溯：', promise);
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.status(404).json({
    status: 'false',
    message: '該頁面不存在！'
  })
})
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // 開發中錯誤
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status: 'false',
      errorName: err.name,
      errorCode: statusCode,
      errorMessage: err.message,
      stacks: err.stack,
      errors: err
    });
  }

  // 已部署
  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'TypeError') {
      err.isOperational = true;
      err.message = '資料型別錯誤，請檢查輸入的資料型別！';
    }
    if (err.name === 'SyntaxError') {
      err.isOperational = true;
      err.message = '語法錯誤，請檢查資料格式！';
    }
    if (err.isOperational) {
      res.status(statusCode).json({
        status: 'false',
        message: err.message
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: '系統發生問題，請聯繫管理員！'
      })
    }
  }
})

module.exports = app;
