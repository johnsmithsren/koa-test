const router = require('koa-router')()
let article_controller = require('../controller/article')
const _ = require('lodash')
const error = require('../util/error')
const Oauth = require('../controller/oauth')
function oauth() {
    ctx.person = 'hello world'
}
router.get('/list_article', async (ctx, next) => {
    let article = new article_controller();
    result = await article.list_article()
    ctx.body = {
        data: result,
        err: 0
    }
    return
})


router.post('/create_article', async (ctx, next) => {
    let article = new article_controller();
    let article_info = ctx.request.body
    result = await article.create_article(article_info)
    ctx.body = {
        data: result,
        err: 0
    }
    return
})


router.get('/get_oauth', async (ctx, next) => {
    console.log(ctx.person)
    let oauth = new Oauth()
    const test = await oauth.get()
    ctx.body = {
        data: test,
        err: 0
    }
    return
})
module.exports = router