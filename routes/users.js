var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.getUsers);
router.delete('/', userController.deleteUsers);
router.post('/sign_up', userController.addUser);
router.post('/sign_in', userController.signIn);

module.exports = router;
