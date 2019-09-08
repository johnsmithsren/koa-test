/*
 * @Auther: renjm
 * @Date: 2018-05-01 18:14:40
 * @LastEditTime: 2019-09-07 10:17:24
 * @Description:
 * 用户信息
 * Created by renjm on 2018-5-1
 */
"use strict";
const _ = require("lodash");
const user_model = require("../model/user");
const uuidv4 = require("uuid/v4");
const jwt = require("jsonwebtoken");
const uuid = require("node-uuid");
const config = require("../config.json");
const redis = require("../util/store.js");
const error = require("../util/error");
module.exports = class User {
  constructor() {}

  /**
   * 检查用户名字是否存在
   * @param {*} name     用户名称
   */
  async check_user_name_exist(name) {
    let user = new user_model();
    return await user.check_user_user_name_exist(name);
  }
  /**
   * 检查用户邮箱是否存在
   * @param {*} email     用户邮箱
   */
  async check_user_email_exist(email) {
    let user = new user_model();
    return await user.check_user_email_exist(email);
  }
  /**
   * 检查用户手机是否存在
   * @param {*} mobile     用户手机
   */
  async check_user_mobile_exist(mobile) {
    let user = new user_model();
    return await user.check_user_mobile_exist(mobile);
  }

  /**
   * 检查用户昵称是否存在
   * @param {*} mobile     用户手机
   */
  async check_user_username_exist(nickname) {
    let user = new user_model();
    return await user.check_user_nickname_exist(nickname);
  }
  /**
   * 创建用户
   * @param {*} info     用户信息
   */
  async create_user(user_info, ctx) {
    let user = new user_model();
    let email = _.get(user_info, "email");
    let mobile = _.get(user_info, "mobile");
    let username = _.get(user_info, "username");
    if (await this.check_user_email_exist(email)) {
      ctx.body = error.InvalidEmail;
      return;
    }
    if (await this.check_user_mobile_exist(mobile)) {
      ctx.body = error.InvalidMobile;
      return;
    }
    if (await this.check_user_username_exist(username)) {
      ctx.body = error.NicknameAlreadyExist;
      return;
    }
    _.set(user_info, "uniqueId", uuidv4());
    const result = await user.create_user(user_info);
    ctx.body = { data: result, message: "success" };
    return;
  }

  /**
   * 查询用户
   * @param {*} user_unique_id     用户ID
   */
  async get_user(accountId) {
    let user = new user_model();
    const result = await user.get_user(accountId);
    return result;
  }

  async list_user(flag) {
    let user = new user_model();
    const result = await user.list_user(flag);
    return result;
  }

  async auth(user_name, password, ctx) {
    let user = new user_model();
    const result = await user.auth(user_name, password, ctx);
    return result;
  }

  async getAcecessToken(result) {
    let AcecessToken = jwt.sign(
      {
        username: result.username,
        email: result.email
      },
      config.secret,
      {
        expiresIn: config.expires
      }
    );
    return AcecessToken;
  }

  async get_user_by_unique_id(unique_id) {
    let user = new user_model();
    const result = await user.get_user_by_unique_id(unique_id);
    return result;
  }
};
