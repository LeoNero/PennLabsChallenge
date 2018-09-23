const {
  Router,
} = require('express')

const { rankingController } = require('../controllers')
const { verifyUser } = require('../middlewares')

const router = Router()

router.get('/', verifyUser, rankingController.get)
router.post('/', verifyUser, rankingController.post)

module.exports = router
