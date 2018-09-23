const Promise = require('bluebird')

const Club = require('../models/Club')

const clubs = [
  {
    name: 'Penn Labs',
    size: 40,
  }, {
    name: 'Penn Coffee Clubs',
    size: 10,
  },
  {
    name: 'Penn Tech Review',
    size: 20,
  },
  {
    name: 'Totally Not a Frat',
    size: 40,
  },
  {
    name: 'Dining Philosophers',
    size: 50,
  },
  {
    name: 'Hack4Impact',
    size: 40,
  },
]

const destroyClubs = () => Club.deleteMany({})

const createClubs = () => (
  Promise.map(clubs, ({
    name,
    size,
  }) => {
    const newClub = new Club({
      name,
      size,
    })

    return newClub.save()
  })
)

module.exports = () => destroyClubs().then(createClubs)
