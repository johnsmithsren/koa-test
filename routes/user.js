/*
 * @Auther: renjm
 * @Date: 2018-05-02 11:43:44
 * @LastEditTime: 2019-09-07 09:39:31
 * @Description: 用户信息处理
 */
const router = require("koa-router")();
const user_controller = require("../controller/user");
const _ = require("lodash");
const error = require("../util/error");
// router.prefix('/users')

router.get("/create/user", async (ctx, next) => {
  let user = new user_controller();
  let userInfo = ctx.request.query;
  result = await user.create_user(userInfo, ctx);
  return;
});

module.exports = router;
