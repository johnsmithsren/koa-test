/*
 * @Auther: renjm
 * @Date: 2019-08-28 14:32:04
 * @LastEditTime: 2019-09-07 10:42:08
 * @Description:
 * Created by renjm on 2018/06/02.
 */

const router = require("koa-router")();
// const jwt = require("jsonwebtoken")
// const uuid = require("node-uuid")
const user_controller = require("../controller/user");
const _ = require("lodash");
const config = require("../config.json");
const error = require("../util/error");
// const checkPermission = require('../util/check')
// const redis = require("../util/store.js");
// router.prefix('/users')

router.get("/login", async (ctx, next) => {
  let username = _.get(ctx.request.query, "username", "");
  let password = _.get(ctx.request.query, "password", "");
  let user = new user_controller();
  let acecessToken = null;
  result = await user.auth(username, password, ctx);
  if (result) {
    acecessToken = await user.getAcecessToken(result);
    ctx.body = {
      accessToken: acecessToken,
      username: result.username,
      email: result.email,
      expireTime: config.expires
    };
  } else {
    ctx.body = error.UserInfoNotCorrect;
  }

  return;
});

router.post("/logout", async (ctx, next) => {
  // let user_name = _.get(ctx.request.body, 'user_name', '')
  // let password = _.get(ctx.request.body, 'password', '')
  // let user = new user_controller();
  // let acecessToken = null
  // result = await user.auth(user_name, password, ctx)
  // if (result) {
  //     acecessToken = await user.getAcecessToken(ctx.user_info.unique_id)
  //     ctx.body = {
  //         data: {
  //             ticket: 'ticket',
  //             accessToken: acecessToken,
  //             expireTime: config.expires,

  //         },
  //         msg: '操作成功',
  //         status: 1,
  //         err: 0
  //     }
  // } else {
  //     ctx.body = error.UserInfoNotCorrect
  // }
  ctx.body = {
    data: {},
    msg: "退出成功！",
    status: 1
  };
  return;
});

router.get("/refresh", async (ctx, next) => {
  // let user = new user_controller()
  // ctx.body = await user.list_user()
  return;
});

module.exports = router;
