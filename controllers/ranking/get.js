module.exports = ({ user: { rankings } }, res) => (
  res.status(200).json(rankings)
)
