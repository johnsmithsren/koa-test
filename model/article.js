
/**
 * 用户信息数据库操作
 * Created by renjm on 2018-5-1.
 */
'use strict';
const _ = require('lodash');
const db_query = require('../model/db')
const util = require('utility')
module.exports = class article_model {

    constructor() {

    }

    /**
     * 获取用户留言列表接口
     */
    async list_article() {
        let articles = []
        let user_list = await db_query.query('select unique_id,status =1 from user')
        _.forEach(user_list, function (_user) {
            let _article = db_query.query('select title,name,create_time from article where user_unique_id = ? and status=1', [_user.unique_id])
            _.concat(articles, _article)
        })
        return articles
    }


    async create_article(article_info) {
        result = await db_query.query('insert into article set status=1 ,create_time = UNIX_TIMESTAMP(NOW()) ,?', [article_info])
        return result
    }
}