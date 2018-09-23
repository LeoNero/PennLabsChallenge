const User = require('../models/User')

// Simulate that Jennifer is logged
exports.verifyUser = (req, res, next) => {
  User
    .findOne({ email: 'j@seas.upenn.edu' })
    .populate('rankings')
    .then((user) => {
      req.user = user
      next()
    })
}
