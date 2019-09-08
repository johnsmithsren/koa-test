/*
 * @Auther: renjm
 * @Date: 2019-09-04 15:58:41
 * @LastEditTime: 2019-09-07 09:35:45
 * @Description:
 */

const Sequelize = require("sequelize");
module.exports = {
  username: Sequelize.STRING(64),
  password: Sequelize.STRING(128),
  email: {
    type: Sequelize.STRING(128),
    allowNull: true
  },
  mobile: {
    type: Sequelize.STRING(128),
    allowNull: true
  },
  uniqueId: Sequelize.STRING(64),
  createTime: {
    type: Sequelize.STRING(128),
    allowNull: false,
    detaultValue: Sequelize.NOW
  },
  updateTime: {
    type: Sequelize.STRING(128),
    allowNull: false,
    detaultValue: Sequelize.NOW
  }
};
