/*
 * @Auther: renjm
 * @Date: 2018-06-02 16:11:05
 * @LastEditTime: 2019-08-23 10:50:36
 * @Description:
 */
const Redis = require("ioredis");
const { Store } = require("koa-session2");
const config = require("../config.json");

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis(config.redisDB.port, config.redisDB.host, {
      // family: config.redis_family,           // 4 (IPv4) or 6 (IPv6)
      password: config.redisDB.password,
      db: config.redisDB.db
    });
  }

  async get(key) {
    let data = await this.redis.get(key);
    return JSON.parse(data);
  }

  async set(key, value, maxAge = config.expires) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(key, JSON.stringify(value), "EX", maxAge);
    } catch (e) {}
    return;
  }

  async destroy(key) {
    return await this.redis.del(key);
  }
}

module.exports = new RedisStore();
