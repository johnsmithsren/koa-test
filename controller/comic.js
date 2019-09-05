/*
 * @Auther: renjm
 * @Date: 2019-08-01 12:51:15
 * @LastEditTime: 2019-09-05 11:54:16
 * @Description: 获取漫画信息路径
 */

"use strict";
const _ = require("lodash");
const comicModel = require("../model/comic");
const uuidv4 = require("uuid/v4");
const oss = require("../model/oss")();
module.exports = class Comic {
  constructor() {}

  /**
   * 漫画信息列表
   */
  async listComic() {
    let comic = new comicModel();
    let comicList = await comic.listComic();
    for (let comic of comicList) {
      // await oss.putACL(_.get(comic, "path"));
      let comicUrl = await oss.getUrl(_.get(comic, "path"));
      _.set(
        comic,
        "title",
        `${_.get(comic, "title")} ${comic.path.split(".")[0]}`
      );
      _.set(comic, "path", comicUrl ? comicUrl : "");
    }
    return comicList;
  }

  /**
   * 漫画最新列表
   */
  async listTopComic() {
    let comic = new comicModel();
    return await comic.listTopComic();
  }

  /**
   * @description: 创建漫画路径
   * @param {type}
   * @return:
   */
  async createComic(info) {
    let comic = new comicModel();
    return await comic.createComic(info);
  }

  static path(comicPath) {
    return `blogpdf/${comicPath}`;
  }
};
