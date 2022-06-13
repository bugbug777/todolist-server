var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/sign_up', userController.addUser);

module.exports = router;
