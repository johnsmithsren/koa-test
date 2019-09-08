/*
 * @Auther: renjm
 * @Date: 2019-09-04 16:06:29
 * @LastEditTime: 2019-09-06 20:27:28
 * @Description: sequalize 数据库类
 */

"use strict";
const _ = require("lodash");
const Sequelize = require("sequelize");
const config = require("../../config.json");
const modelObject = [
  { name: "content", defineObject: require("./content") },
  {
    name: "comic",
    defineObject: require("./comic")
  },
  {
    name: "user",
    defineObject: require("./user")
  }
];

class sequlizeDatabase {
  constructor() {
    this.init();
  }

  /**
   * @description: 初始化数据库
   * @param {type}
   * @return:
   */
  init() {
    this.model = [];
    this.sequelize = new Sequelize(
      config.mysqlDB.database,
      config.mysqlDB.user,
      config.mysqlDB.password,
      {
        host: config.mysqlDB.host,
        dialect: "mysql",
        pool: {
          max: 20,
          min: 0,
          idle: 30000
        }
      }
    );
    for (let model of modelObject) {
      let m = this.sequelize.define(model.name, model.defineObject, {
        freezeTableName: true,
        tableName: model.name,
        timestamps: false
      });
      m.sync();
    }
  }
}

let _sequlizeData = () => {
  let _sequlizeDatabase;
  if (!_sequlizeDatabase) {
    _sequlizeDatabase = new sequlizeDatabase();
  }
  return _sequlizeDatabase;
};
module.exports = _sequlizeData();
