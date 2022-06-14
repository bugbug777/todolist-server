const db = require('mongoose');

const userSchema = new db.Schema(
  {
    email: {
      type: String,
      required: [true, '電子信箱為必填欄位！']
    },
    name: {
      type: String,
      required: [true, '暱稱為必填欄位！']
    },
    password: {
      type: String,
      required: [true, '密碼為必填欄位！'],
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
)

const UserModel = db.model('User', userSchema);

module.exports = UserModel;