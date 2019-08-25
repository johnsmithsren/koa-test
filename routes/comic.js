/*
 * @Auther: renjm
 * @Date: 2019-08-01 12:41:17
 * @LastEditTime: 2019-08-25 18:15:48
 * @Description:
 */
const router = require("koa-router")();
let comicController = require("../controller/comic");
const _ = require("lodash");
const error = require("../util/error");
const checkPermission = require("../util/check");

/**
 * @description: 获取漫画列表
 * @param {type}
 * @return:
 */
router.get("/list/comic", async (ctx, next) => {
  //   await checkPermission.check(ctx);
  let level = 1;
  if (_.get(ctx.user_info, "code") || !ctx.user_info) {
    level = 1;
  } else {
    level = ctx.user_info.level;
  }
  let comic = new comicController();
  result = await comic.listComic(level);
  ctx.body = result;
  return;
});

/**
 * @description: 获取漫画最新更新
 * @param {type}
 * @return:
 */
router.get("/list/top/comic", async (ctx, next) => {
  //   await checkPermission.check(ctx);
  let comic = new comicController();
  result = await comic.listTopComic();
  ctx.body = result;
  return;
});

/**
 * @description: 创建漫画路径
 * @param {type}
 * @return:
 */
router.post("/create/pdf", async (ctx, next) => {
  //   await checkPermission.check(ctx);
  let comic = new comicController();
  let comicInfo = ctx.request.body;
  result = await comic.createComic(comicInfo);
  ctx.body = result;
  return;
});
// router.post("/create/pdf", async (ctx, next) => {
//   await checkPermission.check(ctx);
//   if (_.get(ctx.user_info, "code") || !ctx.user_info) {
//     ctx.body = ctx.user_info;
//     return;
//   }
//   let article = new article_controller();
//   let article_info = ctx.request.body;
//   result = await article.create_article(
//     article_info,
//     ctx.user_info.unique_id,
//     ctx.user_info.level
//   );
//   ctx.body = result;
//   return;
// });

module.exports = router;
