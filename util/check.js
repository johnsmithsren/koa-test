const mysql = require('mysql')
const _ = require("lodash")
const config = require("../config.json")
const error = require('../util/error')
const user_controller = require('../controller/user')
const jwt = require("jsonwebtoken")
module.exports.check = async function (ctx) {
    let token = _.get(ctx.headers, "token", false)
    if (token) {
        jwt.verify(token, config.secret, (err, result) => {
            if (err) {
                ctx.token_info = error.AcceessTokenExpired
            } else {
                ctx.token_info = result
            }
        })
        if (_.get(ctx.token_info, "message", "") === "AcceessTokenExpired") {
            return ctx.user_info = error.AcceessTokenExpired
        }
        let user = new user_controller();
        result = await user.get_user_by_unique_id(ctx.token_info.unique_id)
        ctx.user_info = result[0]
    } else {
        return ctx.user_info = error.UserInfoNotCorrect
    }
    return
}