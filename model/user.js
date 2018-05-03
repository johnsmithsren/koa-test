/**
 * 用户信息数据库操作
 * Created by renjm on 2018-5-1.
 */
'use strict';
const _ = require('lodash');
const db_query = require('../model/db')
const util = require('utility')
module.exports = class user_model {

    constructor() {

    }

    /**
     * 创建用户
     * @param {*} user_info         用户详细信息
     */
    async create_user(user_info) {
        const _create_time = util.timestamp()
        const _user = {
            user_name: user_info.name,
            nick_name: user_info.nick_name,
            email: user_info.emial,
            mobile: user_info.mobile,
            unique_id: user_info.unique_id,
            create_time: _create_time,
            password: util.md5(user_info.password + _create_time)
        }
        const result = await db_query.query('insert into user set ?', [_user])
        _.set(_user, 'id', result.insertId)
        return _user
    }

    /**
     * 获取用户信息
     * @param {*} user_unique_id    用户ID
     */
    async get_user(unique_id) {
        const info = await db_query.query('select id,nick_name from user where id = ?', [unique_id])
        return info
    }

    async list_user() {
        const user_list = await db_query.query('select id,nick_name,user_name,mobile,email from user')
        return user_list
    }

};