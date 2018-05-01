/**
 * 用户信息数据库操作
 * Created by renjm on 2018-5-1.
 */
'use strict';
const _ = require('lodash');
const db_query = require('../model/db')

module.exports = class user_model {

    constructor() {

    }

    /**
     * 创建用户
     * @param {*} info         用户详细信息
     */
    create_user(info) {

    }

    /**
     * 获取用户信息
     * @param {*} user_unique_id    用户ID
     */
    async get_user(unique_id) {
        const info = await db_query.query('select id,nick_name from user where id = ?', ['1'])
        return info
    }

};