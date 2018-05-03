/**
 * 用户信息
 * Created by renjm on 2018-5-1
 */
'use strict';
const _ = require('lodash');
const user_model = require('../model/user');
const uuidv4 = require('uuid/v4')
module.exports = class User {
    constructor() {
    }

    /**
    * 检查用户名字是否存在
    * @param {*} name     用户名称
    */
    check_user_name_exist(name) {
        let user = new user_model()
        return user.check_user_name(name)
    }
    /**
    * 检查用户邮箱是否存在
    * @param {*} email     用户邮箱
    */
    check_user_email_exist(email) {
        let user = new user_model()
        return user.check_user_name(email)
    }
    /**
    * 检查用户手机是否存在
    * @param {*} mobile     用户手机
    */
    check_user_mobile_exist(mobile) {
        let user = new user_model()
        return user.check_user_mobile(mobile)
    }

    /**
    * 检查用户手机是否存在
    * @param {*} mobile     用户手机
    */
    check_user_nickname_exist(nickname) {
        let user = new user_model()
        return user.check_user_na(nickname)
    }
    /**
    * 创建用户
    * @param {*} info     用户信息
    */
    async create_user(user_info) {
        let user = new user_model()
        let email = _.get(user_info, 'email')
        let mobile = _.get(user_info, 'mobile')
        let nickname = _.get(user_info, 'nick_name')
        let name = _.get(user_info, 'name')
        // if (this.check_user_email_exist(email)) {
        //     ctx.body = error.InvalidEmail
        //     return
        // }
        // if (this.check_user_mobile_exist(mobile)) {
        //     ctx.body = error.InvalidMobile
        //     return
        // }
        // if (this.check_user_name_exist(name)) {
        //     ctx.body = error.InvalidUsername
        //     return
        // }
        // if (this.check_user_nickname_exist(nickname)) {
        //     ctx.body = error.NicknameAlreadyExist
        //     return
        // }
        _.set(user_info, 'unique_id', uuidv4())
        const result = await user.create_user(user_info)
        return result;
    }

    /**
     * 查询用户
     * @param {*} user_unique_id     用户ID
     */
    async get_user(accountId) {
        let user = new user_model()
        const result = await user.get_user(accountId)
        return result;
    }

    async list_user() {
        let user = new user_model()
        const result = await user.list_user()
        return result
    }
}
