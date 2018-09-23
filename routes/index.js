const express = require('express')
const clubsRouter = require('./clubs')
const rankingsRouter = require('./rankings')
const userRouter = require('./user')

const app = express()

app.use('/clubs', clubsRouter)
app.use('/rankings', rankingsRouter)
app.use('/user', userRouter)

module.exports = app
