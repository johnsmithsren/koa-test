/*
 * @Auther: renjm
 * @Date: 2019-08-28 14:32:04
 * @LastEditTime: 2019-10-01 18:00:08
 * @Description: 博客文章内容查询
 * Created by renjm on 2018-5-1.
 */
"use strict";
const _ = require("lodash");
const db_query = require("../model/db");
const util = require("utility");
const Sequelize = require("./mysqlModel/index").sequelize;
const moment = require("moment");
module.exports = class article_model {
  constructor() { }

  /**
   * 获取用户留言列表接口
   */
  async list_article(page, pageSize) {
    let limit = _.toNumber(pageSize);
    let offset = (_.toNumber(page) - 1) * _.toNumber(pageSize);
    let contentInfo = await Sequelize.models.content.findAndCountAll({
      limit: _.toNumber(limit),
      offset: _.toNumber(offset)
    });
    return contentInfo;
  }

  /**
   * 获取用户留言列表接口
   */
  async getNewestArticle() {
    let articles = await Sequelize.models.content.findAll({
      limit: 1,
      order: [["id", "ASC"]]
    });
    return articles;
  }

  async create_article(article_info) {
    let result = await Sequelize.models.content.create(
      _.assign(article_info, {
        createTime: moment().unix(),
        updateTime: moment().unix()
      })
    );
    return result;
  }

  async deleteContent(article_info) {
    let article = await Sequelize.models.content.findOne({
      where: {
        id: _.get(article_info, "id")
      }
    });
    if (article) {
      await Sequelize.models.content.destroy({
        where: {
          id: _.get(article, "id")
        }
      });
      return true;
    }
    return false;
  }

  async editContent(article_info) {
    let article = await Sequelize.models.content.findOne({
      where: {
        id: _.get(article_info, "id")
      }
    });
    if (article) {
      await Sequelize.models.content.update(
        _.assign(article_info, { updateTime: moment().unix() }),
        {
          where: {
            id: _.get(article_info, "id")
          }
        }
      );
      return true;
    }
    return false;
  }

  async getContent(id) {
    let article = await Sequelize.models.content.findOne({
      where: {
        id: id
      }
    });
    if (article) {
      return article;
    }
    return {};
  }
};
