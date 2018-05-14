/**
 * 鉴权方面函数
 * Created by renjm on 2018-5-3
 */
'use strict';
const _ = require('lodash');
const article_model = require('../model/article');
const uuidv4 = require('uuid/v4')
const redis = require('redis');
const bluebird = require('bluebird')
let client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
module.exports = class Oauth {
    constructor() {
    }

    async  get(param) {
        let result = await client.getAsync(param).then(function (res) {
            return res
        });
        return result
    }

    async  set(key, value) {
        let result = await client.setAsync(key, value).then(function (res) {
            return res
        });
        return result
    }

}