const {
  Router,
} = require('express')

const router = Router()

const { userController } = require('../controllers')

router.get('/:id', userController.get)

module.exports = router
