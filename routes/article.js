const router = require('koa-router')()
let article_controller = require('../controller/article')
const _ = require('lodash')
const error = require('../util/error')


router.get('/list_article', async (ctx, next) => {
    let article = new article_controller();
    result = await article.list_article()
    ctx.body = {
        data: result,
        err: 0
    }
    return
})


router.get('/create_article', async (ctx, next) => {
    let article = new article_controller();
    let article_info = ctx.request.body
    result = await article.create_article(article_info)
    ctx.body = {
        data: result,
        err: 0
    }
    return
})

module.exports = router