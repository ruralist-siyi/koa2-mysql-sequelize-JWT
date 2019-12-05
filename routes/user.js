const router = require('koa-router')()
const UserController = require('../controllers/user')

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/create', UserController.create)

router.post('/queryDetail', UserController.detail)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
