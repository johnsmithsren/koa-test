/*
 * @Auther: renjm
 * @Date: 2019-08-01 12:57:45
 * @LastEditTime: 2019-08-01 13:00:04
 * @Description: 漫画信息model部分
 */

"use strict";
const _ = require("lodash");
const db_query = require("../model/db");
const util = require("utility");
module.exports = class article_model {
  constructor() {}

  /**
   * 获取用户留言列表接口
   */
  async listComic(level) {
    let comicList = db_query.query("select id,title,path from comic limit 10");
    return comicList;
  }
};
