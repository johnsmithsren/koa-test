/*
 * @Auther: renjm
 * @Date: 2019-09-04 15:58:48
 * @LastEditTime: 2019-09-04 17:22:19
 * @Description:
 */

"use strict";
const Sequelize = require("sequelize");
/**
 * @description: 返回漫画的表字段构成
 * @param {type}
 * @return:
 */

module.exports = {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  title: Sequelize.STRING(64),
  path: Sequelize.TEXT
};
