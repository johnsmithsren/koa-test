const router = require("koa-router")();
let article_controller = require("../controller/article");
const _ = require("lodash");
const error = require("../util/error");
const checkPermission = require("../util/check");
router.get("/list/content", async (ctx, next) => {
  //   await checkPermission.check(ctx);
  let level = 1;
  if (_.get(ctx.user_info, "code") || !ctx.user_info) {
    level = 1;
  } else {
    level = ctx.user_info.level;
  }
  let article = new article_controller();
  result = await article.list_article(level);
  ctx.body = result;
  return;
});

router.post("/create_article", async (ctx, next) => {
  await checkPermission.check(ctx);
  if (_.get(ctx.user_info, "code") || !ctx.user_info) {
    ctx.body = ctx.user_info;
    return;
  }
  let article = new article_controller();
  let article_info = ctx.request.body;
  result = await article.create_article(
    article_info,
    ctx.user_info.unique_id,
    ctx.user_info.level
  );
  ctx.body = result;
  return;
});

router.post("/delete_article", async (ctx, next) => {
  await checkPermission.check(ctx);
  if (_.get(ctx.user_info, "code") || !ctx.user_info) {
    ctx.body = ctx.user_info;
    return;
  }
  let article = new article_controller();
  let article_info = ctx.request.body;
  result = await article.delete_article(article_info, ctx.user_info.unique_id);
  if (result) {
    ctx.body = "success";
  } else {
    ctx.body = "false";
  }
  return;
});

router.post("/edit_article", async (ctx, next) => {
  await checkPermission.check(ctx);
  if (_.get(ctx.user_info, "code") || !ctx.user_info) {
    ctx.body = ctx.user_info;
    return;
  }
  let article = new article_controller();
  let article_info = ctx.request.body;
  result = await article.edit_article(article_info, ctx.user_info.unique_id);
  ctx.body = result;
  return;
});

router.get("/get_article", async (ctx, next) => {
  await checkPermission.check(ctx);
  if (_.get(ctx.user_info, "code") || !ctx.user_info) {
    ctx.body = ctx.user_info;
    return;
  }
  let article = new article_controller();
  let article_info = ctx.query;
  result = await article.get_article(article_info, ctx.user_info.unique_id);
  ctx.body = result;
  return;
});
module.exports = router;
