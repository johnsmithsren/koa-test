/*
 * @Auther: renjm
 * @Date: 2019-08-28 14:32:04
 * @LastEditTime: 2019-09-03 21:50:19
 * @Description:
 */
const router = require("koa-router")();
let article_controller = require("../controller/article");
const _ = require("lodash");
const error = require("../util/error");
const checkPermission = require("../util/check");

/**
 * @description: 获取博客列表
 * @param {type}
 * @return:
 */
router.get("/list/content", async (ctx, next) => {
  //   await checkPermission.check(ctx);
  let { pageSize, page } = ctx.request.query;
  let article = new article_controller();
  result = await article.list_article(pageSize, page);
  ctx.body = result;
  return;
});

/**
 * @description:  获取最新一条博客名称
 * @param {type}
 * @return:
 */
router.get("/list/top/content", async (ctx, next) => {
  let article = new article_controller();
  result = await article.getTopArticle();
  ctx.body = result;
  return;
});

router.post("/create/content", async (ctx, next) => {
  let article = new article_controller();
  let article_info = ctx.request.body;
  let result = await article.createContent(article_info);
  ctx.body = result;
  return;
});

router.delete("/delete/content", async (ctx, next) => {
  let article = new article_controller();
  let articleId = ctx.request.query;
  result = await article.deleteContent(articleId);
  if (result) {
    ctx.body = "success";
  } else {
    ctx.body = "false";
  }
  return;
});

router.post("/edit/content", async (ctx, next) => {
  let article = new article_controller();
  let article_info = ctx.request.body;
  let result = await article.editContent(article_info);
  ctx.body = result;
  return;
});

router.get("/get/content", async (ctx, next) => {
  // if (_.get(ctx.user_info, "code") || !ctx.user_info) {
  //   ctx.body = ctx.user_info;
  //   return;
  // }
  let article = new article_controller();
  let article_info = ctx.query;
  result = await article.getContent(article_info);
  ctx.body = result;
  return;
});
module.exports = router;
