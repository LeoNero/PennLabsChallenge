const chalk = require('chalk')
const createUser = require('./createUser')
const createClubs = require('./createClubs')

const config = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(chalk.blue('CREATING CLUBS AND USER...'))

    createClubs()
      .then(createUser)
      .then(() => console.log(chalk.green('User and clubs created!')))
      .catch(console.log)
  }
}

module.exports = config
