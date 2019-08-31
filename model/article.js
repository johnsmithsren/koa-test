/*
 * @Auther: renjm
 * @Date: 2019-08-28 14:32:04
 * @LastEditTime: 2019-08-31 20:06:32
 * @Description: 博客文章内容查询
 * Created by renjm on 2018-5-1.
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
  async list_article(level) {
    let articles = db_query.query(
      "select id,title,content,createTime from content limit 10"
    );
    return articles;
  }

  /**
   * 获取用户留言列表接口
   */
  async getNewestArticle() {
    let articles = db_query.query(
      "select id,title from content order by id desc limit 1"
    );
    return articles;
  }

  async create_article(article_info) {
    let result = await db_query.query(
      "insert into content set createTime = UNIX_TIMESTAMP(NOW()) ,?",
      [article_info]
    );
    return result;
  }

  async check_user_level(user_unique_id) {
    result = await db_query.query(
      "select id from  article where user_unique_id =？and status=1",
      [user_unique_id]
    );
    let level = 1;
    if (result.length <= 2) {
      level = 1;
    } else if (2 < result.length <= 5) {
      level = 2;
    } else if (5 < result.length <= 50) {
      level = 3;
    }
    return level;
  }

  async deleteContent(article_info) {
    let article = await db_query.query("select * from  content where id = ? ", [
      _.get(article_info, "id", "")
    ]);
    if (article.length > 0) {
      await db_query.query("delete from  content where id =?", [article[0].id]);
      return true;
    }
    return false;
  }

  async editContent(article_info) {
    let article = await db_query.query("select * from  content where id = ?", [
      _.get(article_info, "id", "")
    ]);
    if (article.length > 0) {
      let info = {
        content: _.get(article_info, "content"),
        title: _.get(article_info, "title")
      };
      await db_query.query("update content set ? where id =?", [
        info,
        _.get(article_info, "id")
      ]);
      return true;
    }
    return false;
  }

  async getContent(id) {
    let article = await db_query.query(
      "select id,content,title from  content where id = ? ",
      id
    );
    if (article.length > 0) {
      return article[0];
    }
    return {};
  }
};
