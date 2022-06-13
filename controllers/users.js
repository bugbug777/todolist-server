const User = require('../models/UserModel');

const getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json({
    status: 'success',
    users
  });
}
const addUser = async (req, res, next) => {
  try {
    let {email, name, password, confirmPassword} = req.body;
    const newUser = await User.create({
      email,
      name,
      password
    });
  
    res.json({
      status: 'success',
      user: newUser
    })
  } catch (error) {
    res.json({
      status: 'false',
      error
    })
  }
}

module.exports = {
  getUsers,
  addUser
}