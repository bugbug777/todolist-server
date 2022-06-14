const db = require('mongoose');

const todoSchema = new db.Schema(
  {
    userId: {
      type: db.ObjectId,
      ref: 'User',
      required: [true, '待辦事項擁有者為必要項目！'],
    },
    content: {
      type: String,
      required: [true, '待辦事項為必填欄位！']
    },
    status: {
      type: Boolean,
      required: [true, '待辦狀態為必填欄位！'],
      default: false
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

const TodoModel = db.model('Todo', todoSchema);

module.exports = TodoModel;