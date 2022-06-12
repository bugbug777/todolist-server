const getUsers = (req, res, next) => {
  res.json({
    status: 'success'
  });
}

module.exports = {
  getUsers
}