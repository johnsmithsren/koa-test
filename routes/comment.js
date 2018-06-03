const router = require('koa-router')()
const comment_controller = require('../controller/comment')
const error = require('../util/error')
const _ = require("lodash")
const checkPermission = require('../util/check')



router.get('/list_comment', async (ctx, next) => {
    // await checkPermission.check(ctx)
    let comment = new comment_controller();
    result = await comment.list_comment(_.get(ctx.query, "article_unique_id", ""))
    ctx.body = result
    return
})


router.post('/create_comment', async (ctx, next) => {
    await checkPermission.check(ctx)
    if (_.get(ctx.user_info, "code") || !ctx.user_info) {
        ctx.body = ctx.user_info
        return
    }
    let comment = new comment_controller();
    let comment_info = ctx.request.body
    await comment.create_comment(comment_info, ctx.user_info.unique_id)
    ctx.body = {}
    return
})


router.post('/delete_comment', async (ctx, next) => {
    await checkPermission.check(ctx)
    if (_.get(ctx.user_info, "code") || !ctx.user_info) {
        ctx.body = ctx.user_info
        return
    }
    let comment = new comment_controller();
    let comment_info = ctx.request.body
    result = await comment.create_comment(comment_info, ctx.user_info.unique_id)
    ctx.body = {
        data: result,
        err: 0
    }
    return
})

router.post('/edit_comment', async (ctx, next) => {
    await checkPermission.check(ctx)
    if (_.get(ctx.user_info, "code") || !ctx.user_info) {
        ctx.body = ctx.user_info
        return
    }
    let comment = new comment_controller();
    let comment_info = ctx.request.body
    result = await comment.edit_comment(comment_info, _.get(comment_info, "unique_id"), ctx.user_info.unique_id)
    ctx.body = {
        data: result,
        err: 0
    }
    return
})


router.post('/get_comment', async (ctx, next) => {
    await checkPermission.check(ctx)
    if (_.get(ctx.user_info, "code") || !ctx.user_info) {
        ctx.body = ctx.user_info
        return
    }
    let comment = new comment_controller();
    let comment_info = ctx.request.body
    result = await comment.get_comment(article_info, ctx.user_info.unique_id, ctx.user_info.level)
    ctx.body = {
        data: result,
        err: 0
    }
    return
})
module.exports = router
