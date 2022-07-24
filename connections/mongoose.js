const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_PATH.replace(
  '<password>',
  process.env.DB_TOKEN
)

mongoose.connect(uri).then((res) => {
  console.log('資料庫連線成功！');
});