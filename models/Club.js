const mongoose = require('mongoose')

const {
  Schema,
} = mongoose

const ClubSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Club', ClubSchema)
