
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
    async list_article(level) {
        let articles = db_query.query('select title,name,create_time from article where  status=1 and level =?', [level])
        return articles
    }


    async create_article(article_info, user_unique_id) {
        result = await db_query.query('insert into article set status=1 ,create_time = UNIX_TIMESTAMP(NOW()) ,?,user_unique_id= ?', [article_info, user_unique_id])
        return result
    }

    async check_user_level(user_unique_id) {
        result = await db_query.query('select id from  article where user_unique_id =？,status=1', [user_unique_id])
        let level = 1
        if (result.length <= 2) {
            level = 1
        } else if (2 < result.length <= 5) {
            level = 2
        } else if (5 < result.length <= 50) {
            level = 3
        }
        return level
    }
}