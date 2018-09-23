const {
  Router,
} = require('express')

const { clubsController } = require('../controllers')

const router = Router()

router.get('/', clubsController.get)
router.post('/', clubsController.post)
router.get('/popular', clubsController.popular)

module.exports = router
