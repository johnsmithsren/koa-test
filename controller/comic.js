/*
 * @Auther: renjm
 * @Date: 2019-08-01 12:51:15
 * @LastEditTime: 2019-08-01 21:52:23
 * @Description: 获取漫画信息路径
 */

"use strict";
const _ = require("lodash");
const comicModel = require("../model/comic");
const uuidv4 = require("uuid/v4");
module.exports = class Comic {
  constructor() {}

  /**
   * 漫画信息列表
   */
  async listComic(level) {
    let comic = new comicModel();
    return await comic.listComic(level);
  }

  /**
   * 漫画最新列表
   */
  async listTopComic() {
    let comic = new comicModel();
    return await comic.listTopComic();
  }
};
