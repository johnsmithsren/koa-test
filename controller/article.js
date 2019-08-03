/**
 * 文章信息
 * Created by renjm on 2018-5-3
 */
"use strict";
const _ = require("lodash");
const article_model = require("../model/article");
const user_model = require("../model/user");
const uuidv4 = require("uuid/v4");
module.exports = class Article {
  constructor() {}

  /**
   * 用户博客列表
   */
  async list_article() {
    let article = new article_model();
    return await article.list_article();
  }
  /**
   * 用户博客列表
   */
  async getTopArticle() {
    let article = new article_model();
    return await article.getNewestArticle();
  }

  /**
   * 创建留言
   */

  async createContent(article_info) {
    let article = new article_model();
    _.set(article_info, "uniqueId", uuidv4());
    return await article.create_article(article_info);
  }

  async deleteContent(article_info) {
    let article = new article_model();
    return await article.deleteContent(article_info);
  }

  // async edit_article(article_info) {
  //   let article = new article_model();
  //   return await article.edit_article(article_info);
  // }

  // async get_article(article_info, user_unique_id) {
  //   let article = new article_model();
  //   return await article.get_article(
  //     _.get(article_info, "unique_id", ""),
  //     user_unique_id
  //   );
  // }
};
