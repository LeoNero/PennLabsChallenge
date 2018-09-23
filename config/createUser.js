const User = require('../models/User')

const destroyUsers = () => User.deleteMany({})

const createUser = (clubs) => {
  const user = new User({
    name: 'Jennifer',
    email: 'j@seas.upenn.edu',
    password: 'ilovearun6789',
    school: 'SEAS',
    rankings: clubs,
  })

  return user.save()
}

module.exports = clubs => destroyUsers().then(createUser(clubs))
