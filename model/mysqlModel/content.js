/*
 * @Auther: renjm
 * @Date: 2019-09-04 15:58:41
 * @LastEditTime: 2019-09-08 10:02:10
 * @Description:
 */

/**
 * @description:  返回文章表的字段构成
 * @param {type}
 * @return:
 */
const Sequelize = require("sequelize");
module.exports = {
  content: Sequelize.TEXT,
  contentType: Sequelize.STRING(128),
  title: Sequelize.STRING(64),
  type: Sequelize.STRING(64),
  uniqueId: Sequelize.STRING(64),
  createTime: {
    type: Sequelize.STRING(128),
    allowNull: false,
    detaultValue: Sequelize.NOW
  },
  username: Sequelize.STRING(128),
  updateTime: {
    type: Sequelize.STRING(128),
    allowNull: false,
    detaultValue: Sequelize.NOW
  }
};
