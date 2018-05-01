const router = require('koa-router')()
let user_controller = require('../controller/user')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


router.post('/hello', async (ctx, next) => {
  ctx.body = {
    msg: 'this is koa response'
  }
})

router.get('/user', async (ctx, next) => {
  let user = new user_controller();
  result = await user.get_user('1')
  ctx.body = {
    msg: result
  }
})


module.exports = router
