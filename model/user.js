/*
 * @Auther: renjm
 * @Date: 2018-05-01 18:20:13
 * @LastEditTime: 2019-09-07 10:08:17
 * @Description: 用户操作
 */

"use strict";
const _ = require("lodash");
const db_query = require("../model/db");
const util = require("utility");
const Sequelize = require("./mysqlModel/index").sequelize;
const moment = require("moment");
module.exports = class user_model {
  constructor() {}

  /**
   * 创建用户
   * @param {*} user_info         用户详细信息
   */
  async create_user(user_info) {
    const _createTime = util.timestamp();
    let _user = _.assign(user_info, {
      createTime: _createTime,
      password: util.md5(user_info.password + _createTime)
    });

    const result = await Sequelize.models.user.create(
      _.assign(user_info, {
        updateTime: moment().unix()
      })
    );
    _.set(_user, "id", result.id);
    return _user;
  }

  /**
   * 获取用户信息
   * @param {*} user_unique_id    用户ID
   */
  async get_user(unique_id) {
    const info = await db_query.query(
      "select id,nickName from user where id = ?",
      [unique_id]
    );
    return info;
  }

  /**
   * 判断用户名称重复
   * @param {*} username    用户名称
   */
  async check_user_userName_exist(userName) {
    const info = await db_query.query(
      "select id,nickName from user where userName = ?",
      [userName]
    );
    return info[0];
  }

  /**
   * 判断用户邮箱重复
   * @param {*} username    用户邮箱
   */
  async check_user_email_exist(email) {
    const info = await Sequelize.models.user.findOne({
      where: {
        email: email
      }
    });
    return info;
  }
  /**
   * 判断用户手机号重复
   * @param {*} username    用户手机号
   */
  async check_user_mobile_exist(mobile) {
    const info = await Sequelize.models.user.findOne({
      where: {
        mobile: mobile
      }
    });
    return info;
  }

  async check_user_nickname_exist(username) {
    const info = await Sequelize.models.user.findOne({
      where: {
        username: username
      }
    });
    return info;
  }

  async list_user(flag) {
    let user_list = null;
    if (flag) {
      user_list = await db_query.query(
        "select id,nickName,userName,mobile,email from user"
      );
    } else {
      user_list = await db_query.query("select id,unique_id from user");
    }
    return user_list;
  }

  async auth(userName, password, ctx) {
    let _user = await Sequelize.models.user.findOne({
      where: {
        username: userName
      }
    });
    if (!_user) {
      _user = await Sequelize.models.user.findOne({
        where: {
          email: userName
        }
      });
      if (!_user) {
        _user = await Sequelize.models.user.findOne({
          where: {
            mobile: userName
          }
        });
        if (!_user) {
          return false;
        }
      }
    }
    if (util.md5(password + _user.createTime) == _user.password) {
      ctx.user_info = _user;
      await Sequelize.models.content.update(
        { updateTime: moment().unix() },
        {
          where: {
            id: _.get(_user, "id")
          }
        }
      );
      return _user;
    }
    return false;
  }

  async get_user_by_unique_id(unique_id) {
    const _user = await db_query.query(
      "select id,createTime,userName,nickName,unique_id,mobile,email,level from user where unique_id = ?",
      [unique_id]
    );
    return _user;
  }

  async update_user_level(user_unique_id, level) {
    await db_query.query("update user set level= ? where unique_id =?", [
      level,
      user_unique_id
    ]);
    return;
  }
};
