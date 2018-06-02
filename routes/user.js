const router = require('koa-router')()
const user_controller = require('../controller/user')
const _ = require('lodash')
const error = require('../util/error')
const checkPermission = require('../util/check')
// router.prefix('/users')



router.get('/get_user', async (ctx, next) => {
    await checkPermission.check(ctx)
    ctx.body = ctx.user_info
    return
})

router.get('/list_user', async (ctx, next) => {
    let user = new user_controller()
    let token = _.get(ctx.header, "token", false)
    ctx.body = await user.list_user(token)

    return
})


router.post('/create_user', async (ctx, next) => {
    let user_info = ctx.request.body
    let user = new user_controller()
    await user.create_user(user_info, ctx)
    return
})

module.exports = router
