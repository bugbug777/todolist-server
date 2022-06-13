const User = require('../models/UserModel');

const getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json({
    status: 'success',
    users
  });
}

module.exports = {
  getUsers
}