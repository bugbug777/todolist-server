var express = require('express');
var router = express.Router();
const TodoController = require('../controllers/todos');

router.get('/', TodoController.getTodos
  /*
    #swagger.description = '取得所有待辦事項'
    #swagger.responses[200] = {
      description: '成功取得所有待辦事項',
      schema: {
        "status": "success",
        "todos": [
            {
                "_id": "62a8b09a28a181801f060c97",
                "userId": "62a88dac16546e18ff6321c3",
                "content": "美麗新世界！",
                "status": false,
                "createdAt": "2022-06-14T16:00:26.587Z"
            }
        ]
      }
    }
  */
);
router.post('/', TodoController.addTodo
  /*
    #swagger.description = '取得所有待辦事項'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
        "$userId": "62a88dac16546e18ff6321c3",
        "$content": "美麗新世界！"
      }
    }
    #swagger.responses[200] = {
      description: '新增成功！',
      schema: {
        "status": "success",
        "todo": {
          "userId": "62a88dac16546e18ff6321c3",
          "content": "美麗新世界！",
          "status": false,
          "_id": "62a8b09a28a181801f060c97",
          "createdAt": "2022-06-14T16:00:26.587Z"
        }
      }
    }
    #swagger.responses[400] = {
      description: '新增失敗！',
      schema: {
        "status": "false",
        "message": "待辦內容不能為空！"
      }
    }
  */
);
router.put('/:todoId', TodoController.editTodo
  /*
    #swagger.description = '編輯待辦事項'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
        "$content": "被編輯的美麗新世界！"
      }
    }
    #swagger.responses[200] = {
      description: '修改成功！',
      schema: {
        "status": "success",
        "todo": {
          "userId": "62a88dac16546e18ff6321c3",
          "content": "美麗新世界！",
          "status": false,
          "_id": "62a8b09a28a181801f060c97",
          "createdAt": "2022-06-14T16:00:26.587Z"
        }
      }
    }
    #swagger.responses[400] = {
      description: '新增失敗！',
      schema: {
        "status": "false",
        "message": "待辦內容不能為空！"
      }
    }
  */
);
router.delete('/', TodoController.deleteTodos
  /*
    #swagger.description = '刪除所有待辦事項'
    #swagger.responses[200] = {
      description: '成功刪除所有待辦事項',
      schema: {
        "status": "success",
        "todos": []
      }
    }
  */
);
router.delete('/:todoId', TodoController.deleteTodo
  /*
    #swagger.description = '刪除待辦事項'
    #swagger.responses[200] = {
      description: '刪除成功！ 回傳被刪除的待辦事項物件。',
      schema: {
        "status": "success",
        "todo": {
          "userId": "62a88dac16546e18ff6321c3",
          "content": "美麗新世界！",
          "status": false,
          "_id": "62a8b09a28a181801f060c97",
          "createdAt": "2022-06-14T16:00:26.587Z"
        }
      }
    }
    #swagger.responses[400] = {
      description: '刪除失敗！',
      schema: {
        "status": "false",
        "message": "找不到該筆待辦事項！"
      }
    }
  */
);

module.exports = router;