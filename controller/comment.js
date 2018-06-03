/**
 * 评论信息
 * Created by renjm on 2018-5-3
 */
'use strict';
const _ = require('lodash');
const comment_model = require('../model/comment');
const uuidv4 = require('uuid/v4')
module.exports = class Comment {
    constructor() {
    }

    /**
    * 用户评论列表
    */
    async list_comment(article_unique_id) {
        let comment = new comment_model()
        return await comment.list_comment(article_unique_id)
    }

    /**
     * 创建留言
     */
    async create_comment(comment_info, user_unique_id) {
        let comment = new comment_model()
        _.set(comment_info, 'unique_id', uuidv4())
        return await comment.create_comment(comment_info, _.get(comment_info, "article_unique_id"), user_unique_id)
    }


    async delete_comment(unique_id, user_unique_id) {
        let comment = new comment_model()
        return await comment.delete_comment(unique_id, user_unique_id)
    }

    async edit_comment(comment_info, unique_id, user_unique_id) {
        let comment = new comment_model()
        return await comment.edit_comment(comment_info, unique_id, user_unique_id)
    }

    async get_comment(unique_id) {
        let comment = new comment_model()
        return await comment.get_comment(unique_id)
    }

}