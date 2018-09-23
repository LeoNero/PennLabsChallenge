const mongoose = require('mongoose')
const {
  match,
} = require('ramda')
const bcrypt = require('bcrypt')

const {
  Schema,
} = mongoose

const validateEmail = match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Email is invalid!'],
  },
  password: {
    type: 'String',
    require: true,
  },
  school: [{
    type: String,
    enum: ['SEAS', 'Wharton', 'The College', 'Nursing'],
  }],
  rankings: [{
    type: Schema.Types.ObjectId,
    ref: 'Club',
    unique: true,
  }],
})

/* cannot use arrow functions here because of scope :( */
/* eslint func-names: 0 */
/* eslint consistent-return: 0 */
UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash
      next()
    })
    .catch(next)
})

module.exports = mongoose.model('User', UserSchema)
