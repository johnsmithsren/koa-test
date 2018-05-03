/**
 * 文章信息
 * Created by renjm on 2018-5-3
 */
'use strict';
const _ = require('lodash');
const article_model = require('../model/article');
const uuidv4 = require('uuid/v4')
module.exports = class Article {
    constructor() {
    }

    /**
    * 用户留言列表
    */
    async list_article() {
        let article = new article_model()
        return await article.list_article()
    }

    /**
   * 创建留言
   */

    async create_article(article_info) {
        let article = new article_model()
        _.set(article_info, 'unique_id', uuidv4())
        return await article.create_article(article_info)
    }

}