const router = require('koa-router')()
const user_controller = require('../controller/user')
const _ = require('lodash')
const error = require('../util/error')
const checkPermission = require('../util/check')
// router.prefix('/users')



router.get('/get_user', async (ctx, next) => {
    let result = await checkPermission.check(ctx)
    if (_.get(result, "code")) {
        return ctx.body = result
    }
    let user_unique_id = _.get(ctx.query, 'user_unique_id', '')
    if (user_unique_id == '') {
        ctx.body = error.InvalidParameter
        return
    }
    let user = new user_controller();
    result = await user.get_user(user_unique_id)
    ctx.body = {
        data: result,
        err: 0
    }
    return
})

router.get('/list_user', async (ctx, next) => {
    let user = new user_controller()
    ctx.body = await user.list_user()
    return
})


router.post('/create_user', async (ctx, next) => {
    let user_info = ctx.request.body
    let user = new user_controller()
    ctx.body = await user.create_user(user_info)
    return
})

module.exports = router
