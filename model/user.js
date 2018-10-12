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
        const _createTime = util.timestamp()
        const _user = {
            userName: user_info.name,
            nickName: user_info.nickname,
            email: user_info.email,
            mobile: user_info.phone,
            unique_id: user_info.unique_id,
            createTime: _createTime,
            password: util.md5(user_info.password + _createTime)
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
        const info = await db_query.query('select id,nickName from user where id = ?', [unique_id])
        return info
    }

    /**
     * 判断用户名称重复
     * @param {*} username    用户名称
     */
    async check_user_userName_exist(userName) {
        const info = await db_query.query('select id,nickName from user where userName = ?', [userName])
        return info[0]
    }

    /**
     * 判断用户邮箱重复
     * @param {*} username    用户邮箱
     */
    async check_user_email_exist(email) {
        const info = await db_query.query('select id,nickName from user where email = ?', [email])
        return info[0]
    }
    /**
     * 判断用户手机号重复
     * @param {*} username    用户手机号
     */
    async check_user_mobile_exist(mobile) {
        const info = await db_query.query('select id,nickName from user where mobile = ?', [mobile])
        return info[0]
    }

    async check_user_nickname_exist(nickName) {
        const info = await db_query.query('select id,nickName from user where nickName = ?', [nickName])
        return info[0]
    }


    async list_user(flag) {
        let user_list = null
        if (flag) {
            user_list = await db_query.query('select id,nickName,userName,mobile,email from user')
        } else {
            user_list = await db_query.query('select id,unique_id from user')
        }
        return user_list
    }

    async auth(userName, password, ctx) {
        let _user = await db_query.query('select id,createTime,userName,password,unique_id from user where email = ?', [userName])
        if (_user.length == 0) {
            _user = await db_query.query('select id,createTime,userName,password,unique_id from user where mobile = ?', [userName])
            if (_user.length == 0) {
                _user = await db_query.query('select id,createTime,userName,password,unique_id from user where userName = ?', [userName])
                if (_user.length == 0) {
                    return false
                }
            }
        }
        if (util.md5(password + _user[0].createTime) == _user[0].password) {
            ctx.user_info = _user[0]
            await db_query.query('update user set login_time = ? where email = ?', [util.timestamp(), _user[0].email])
            return true
        }
        return false
    }


    async get_user_by_unique_id(unique_id) {
        const _user = await db_query.query('select id,createTime,userName,nickName,unique_id,mobile,email,level from user where unique_id = ?', [unique_id])
        return _user
    }


    async update_user_level(user_unique_id, level) {
        await db_query.query('update user set level= ? where unique_id =?', [level, user_unique_id])
        return
    }
};