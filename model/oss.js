/*
 * @Auther: renjm
 * @Date: 2019-08-26 21:37:05
 * @LastEditTime: 2019-09-05 14:17:25
 * @Description:
 */
const oss = require("ali-oss");
const config = require("../config.json");

class Oss {
  /**
   * 构造函数
   * @param {*} config    OSS配置文件
   */
  constructor(config) {
    this.store = oss(config);
  }

  /**
   * 保存数据至OSS
   * @param {*} path      OSS路径
   * @param {*} obj       待保存对象
   */
  async save(path, obj) {
    let result = await this.store.put(path, Buffer.from(JSON.stringify(obj)));
    return _.get(result, "url");
  }

  /**
   * 获取文件
   * @param {*} path      文件路径
   */
  async get(path) {
    try {
      let result = await this.store.get(path);
      return JSON.parse(new String(_.get(result, "content", "{}")));
    } catch (e) {
      throw `网络异常或者文件不存在`;
    }
  }

  /**
   * @description: 获取pdf文件url
   * @param {type}
   * @return:
   */
  async getUrl(path) {
    try {
      const url = await this.store.signatureUrl(path, {
        expires: 3600
      });
      return url;
    } catch (error) {
      throw `获取文件url异常`;
    }
  }

  async putACL(path, _default = "public-read") {
    let result = "";
    try {
      result = await this.store.putACL(path, _default);
    } catch (error) {
      throw `授权异常`;
    }
    return result;
  }
}

let _oss;

module.exports = () => {
  if (!_oss) {
    _oss = new Oss(config.oss);
  }
  return _oss;
};
