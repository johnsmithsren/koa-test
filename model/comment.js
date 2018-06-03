
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
    async list_comment(article_unique_id) {
        let comments = db_query.query('select * from comment where  article_unique_id =?', [article_unique_id])
        return comments
    }


    async create_comment(comment_info, article_unique_id, user_unique_id) {
        result = await db_query.query('insert into comment set create_time = UNIX_TIMESTAMP(NOW()) ,?,user_unique_id= ?', [comment_info, user_unique_id])
        return result
    }


    async delete_comment(unique_id, user_unique_id) {
        let comment = await db_query.query('select * from  comment where unique_id = ?  and  user_unique_id = ?', [unique_id, user_unique_id])
        if (comment.length > 0) {
            await db_query.query('delete from  comment where unique_id =?', [comment[0].unique_id])
            return true
        }
        return false
    }

    async edit_comment(comment_info, unique_id, user_unique_id) {
        let comment = await db_query.query('select * from  comment where user_unique_id = ? and  unique_id=? ', [user_unique_id, unique_id])
        if (comment.length > 0) {
            await db_query.query('update comment set content=? where unique_id =?', [_.get(comment_info, "content", ""), comment[0].unique_id])
            return true
        }
        return false
    }
}