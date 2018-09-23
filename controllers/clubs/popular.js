const Club = require('../../models/Club')

module.exports = (req, res) => (
  Club
    .find()
    .sort({ size: -1 })
    .then(clubs => res.status(200).json(clubs))
)
