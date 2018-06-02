/**
 * Created by renjm on 2018/06/02.
 */


const router = require('koa-router')()
// const jwt = require("jsonwebtoken")
// const uuid = require("node-uuid")
const user_controller = require('../controller/user')
const _ = require('lodash')
const config = require("../config.json")
const error = require('../util/error')
// const checkPermission = require('../util/check')
// const redis = require("../util/store.js");
// router.prefix('/users')



router.post('/login', async (ctx, next) => {
    let user_name = _.get(ctx.request.body, 'user_name', '')
    let password = _.get(ctx.request.body, 'password', '')
    let user = new user_controller();
    let acecessToken = null
    result = await user.auth(user_name, password)
    if (result) {
        acecessToken = await user.getAcecessToken(user_name)
    } else {
        ctx.body = error.UserInfoNotCorrect
    }
    ctx.body = {
        data: {
            accessToken: acecessToken,
            expireTime: config.expires,
        },
        err: 0
    }
    return
})

router.get('/refresh', async (ctx, next) => {
    // let user = new user_controller()
    // ctx.body = await user.list_user()
    return
})

module.exports = router
