const mysql = require('mysql')
const _ = require("lodash")
const config = require("../config.json")
const error = require('../util/error')
const user_controller = require('../controller/user')
const jwt = require("jsonwebtoken")
module.exports.check = async function (ctx) {
    let token = _.get(ctx.headers, "token", false)
    if (token) {
        let _result = jwt.verify(token, config.secret);
        let user = new user_controller();
        result = await user.get_user_by_username(username)
    } else {
        return error.UserInfoNotCorrect
    }
    return
}