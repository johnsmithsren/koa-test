/**
 * 文章信息
 * Created by renjm on 2018-5-3
 */
'use strict';
const _ = require('lodash');
const article_model = require('../model/article');
const user_model = require('../model/user');
const uuidv4 = require('uuid/v4')
module.exports = class Article {
    constructor() {
    }

    /**
    * 用户留言列表
    */
    async list_article(level) {
        let article = new article_model()
        return await article.list_article(level)
    }

    /**
   * 创建留言
   */

    async create_article(article_info, user_unique_id, user_current_level) {
        let article = new article_model()
        let user = new user_model()
        let level = await article.check_user_level(user_unique_id)
        if (user_current_level != level) {
            await user.update_user_level(user_unique_id, level)
        }

        _.set(article_info, 'unique_id', uuidv4())
        _.set(article_info, "level", level)
        return await article.create_article(article_info, user_unique_id)
    }


    async delete_article(article_info, user_unique_id) {
        let article = new article_model()
        return await article.delete_article(article_info, user_unique_id)
    }

    async edit_article(article_info, user_unique_id) {
        let article = new article_model()
        return await article.edit_article(article_info, user_unique_id)
    }

    async get_article(article_info, user_unique_id) {
        let article = new article_model()
        return await article.get_article(_.get(article_info, "unique_id", ""), user_unique_id)
    }

}