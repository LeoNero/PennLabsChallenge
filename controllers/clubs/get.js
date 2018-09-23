const Club = require('../../models/Club')

module.exports = (req, res) => (
  Club.find({})
    .select('_id name size')
    .then(clubs => res.status(200).json(clubs))
)
