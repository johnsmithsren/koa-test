/**
 * 用户信息
 * Created by renjm on 2018-5-1
 */
'use strict';
const _ = require('lodash');
const user_model = require('../model/user');
const uuidv4 = require('uuid/v4')
const jwt = require("jsonwebtoken")
const uuid = require("node-uuid")
const config = require("../config.json")
const redis = require("../util/store.js");
const error = require('../util/error')
module.exports = class User {
    constructor() {
    }

    /**
    * 检查用户名字是否存在
    * @param {*} name     用户名称
    */
    async check_user_name_exist(name) {
        let user = new user_model()
        return await user.check_user_user_name_exist(name)
    }
    /**
    * 检查用户邮箱是否存在
    * @param {*} email     用户邮箱
    */
    async check_user_email_exist(email) {
        let user = new user_model()
        return await user.check_user_email_exist(email)
    }
    /**
    * 检查用户手机是否存在
    * @param {*} mobile     用户手机
    */
    async check_user_mobile_exist(mobile) {
        let user = new user_model()
        return await user.check_user_mobile_exist(mobile)
    }

    /**
    * 检查用户昵称是否存在
    * @param {*} mobile     用户手机
    */
    async check_user_nickname_exist(nickname) {
        let user = new user_model()
        return await user.check_user_nickname_exist(nickname)
    }
    /**
    * 创建用户
    * @param {*} info     用户信息
    */
    async create_user(user_info, ctx) {
        let user = new user_model()
        let email = _.get(user_info, 'email')
        let mobile = _.get(user_info, 'mobile')
        let nickname = _.get(user_info, 'nick_name')
        let name = _.get(user_info, 'name')
        if (await this.check_user_email_exist(email)) {
            ctx.body = error.InvalidEmail
            return
        }
        if (await this.check_user_mobile_exist(mobile)) {
            ctx.body = error.InvalidMobile
            return
        }
        if (await this.check_user_name_exist(name)) {
            ctx.body = error.InvalidUsername
            return
        }
        if (await this.check_user_nickname_exist(nickname)) {
            ctx.body = error.NicknameAlreadyExist
            return
        }
        _.set(user_info, 'unique_id', uuidv4())
        const result = await user.create_user(user_info)
        ctx.body = {}
        return
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

    async list_user(flag) {
        let user = new user_model()
        const result = await user.list_user(flag)
        return result
    }

    async auth(user_name, password, ctx) {
        let user = new user_model()
        const result = await user.auth(user_name, password, ctx)
        return result
    }


    async getAcecessToken(unique_id) {
        let _uuid = uuid.v4()
        let AcecessToken = jwt.sign({
            unique_id: unique_id,
            uuid: _uuid
        }, config.secret, {
                expiresIn: config.expires
            });
        await redis.set(unique_id + '_' + _uuid, _uuid)
        return AcecessToken
    }


    async get_user_by_unique_id(unique_id) {
        let user = new user_model()
        const result = await user.get_user_by_unique_id(unique_id)
        return result
    }


}
