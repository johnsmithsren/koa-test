/**
 * 用户信息
 * Created by renjm on 2018-5-1
 */
'use strict';
const _ = require('lodash');
const user_model = require('../model/user');
module.exports = class User {
    constructor() {
    }

    /**
    * 创建用户
    * @param {*} info     用户信息
    */
    async createUser(info) {
        let user = new user_model()
        const result = await user.create_user(info)
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
}
