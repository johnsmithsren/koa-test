/*
 * @Auther: renjm
 * @Date: 2019-08-01 12:57:45
 * @LastEditTime: 2019-09-05 13:26:56
 * @Description: 漫画信息model部分
 */

"use strict";
const _ = require("lodash");
const db_query = require("../model/db");
const util = require("utility");
const Sequelize = require("./mysqlModel/index").sequelize;
module.exports = class article_model {
  constructor() {}

  /**
   * 获取漫画列表接口
   */
  async listComic() {
    let comicList = db_query.query("select id,title,path from comic limit 10");
    return comicList;
  }
  /**
   * 获取最新
   */
  async listTopComic() {
    let topComic = db_query.query(
      "select id,title,path from comic order by id desc limit 1"
    );
    return topComic;
  }

  async createComic(info) {
    let result = await Sequelize.models.comic.findOne({
      where: {
        path: _.get(info, "path")
      }
    });
    if (!result) {
      result = db_query.query("insert into comic set ?", [info]);
    }
    return result;
  }
};
