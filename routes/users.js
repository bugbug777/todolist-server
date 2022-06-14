var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.getUsers
  /*
    #swagger.description = '取得所有使用者'
    #swagger.responses[200] = {
        description: '成功取得所有使用者',
        schema: {
          "status": "success",
          "users": [
              {
                  "_id": "62a888716ff45e8490b4ac6e",
                  "email": "example@gmail.com",
                  "name": "Steve Jobs",
                  "createdAt": "2022-06-14T13:09:05.265Z"
              }
          ]
        }
      }
   */
);
router.delete('/', userController.deleteUsers
  /*
    #swagger.description = '刪除所有使用者'
    #swagger.responses[200] = {
        description: '成功取得所有使用者',
        schema: {
          "status": "success",
          "users": []
        }
      }
   */
);
router.post('/sign_up', userController.addUser
  /*
    #swagger.description = '使用者註冊'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
        $name: "Steve Jobs",
        $email: "example@gmail.com",
        $password: "qwe12345",
        $confirmPassword: "qwe12345"
      }
    }
    #swagger.responses[200] = {
        description: '成功取得所有使用者',
        schema: {
          "status": "success",
          "user": {
              email: "example@gmail.com",
              name: "Steve Jobs",
              _id: "62a88dac16546e18ff6321c3",
              createdAt: "2022-06-14T13:31:24.530Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTg4ZGFjMTY1NDZlMThmZjYzMjFjMyIsImlhdCI6MTY1NTIxMzQ4NCwiZXhwIjoxNjU3ODA1NDg0fQ.thfgxDe3oj0x6MaBPNtGXy1b8gHLpKTyzepfca0oLGg"
        }
      }
    #swagger.responses[400] = {
      description: '電子信箱重複註冊',
      schema: {
        "status": "false",
        "message": "該電子信箱已註冊！"
      }
    }
   */
);
router.post('/sign_in', userController.signIn
  /*
    #swagger.description = '使用者登入'
    #swagger.parameters = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: {
        "$email": "gubug777@gmail.com",
        "$password": "qwe12345"
      }
    }
    #swagger.responses[200] = {
        description: '成功取得所有使用者',
        schema: {
          "status": "success",
          "user": {
              "_id": "62a88dac16546e18ff6321c3",
              "email": "example@gmail.com",
              "name": "Steve Jobs",
              "createdAt": "2022-06-14T13:31:24.530Z"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTg4ZGFjMTY1NDZlMThmZjYzMjFjMyIsImlhdCI6MTY1NTIxMzk5MywiZXhwIjoxNjU3ODA1OTkzfQ.jQyDN4jZbUcVD9PZ6dT7Sw9zQn_8Kh81LdPSv3gCqSw"
        }
      }
    #swagger.responses[400] = {
        description: '未註冊使用者',
        schema: {
          "status": "false",
          "message": "找不到該使用者！"
        }
      }
   */
);

module.exports = router;
