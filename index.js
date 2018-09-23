const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const apiRouter = require('./routes')
const config = require('./config')
const { buildSingleError } = require('./helpers/errorBuilder')

const {
  MONGO_URI,
  PORT,
} = process.env

const app = express()

mongoose.connect(MONGO_URI || 'mongodb://localhost/penn-club-review')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('X-HTTP-Method-Override'))

app.use('/api', apiRouter)
app.use((req, res) => (
  res.status(404).json(buildSingleError(req, {
    type: 'not_found',
    message: 'Route not found',
    parameter_name: null,
  }))
))

config()

app.listen(PORT || 8080, () => console.log('Server is running'))
