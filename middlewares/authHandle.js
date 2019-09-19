/*
 * @Auther: renjm
 * @Date: 2019-09-08 09:32:42
 * @LastEditTime: 2019-09-19 10:31:49
 * @Description:
 */

const jwt = require("jsonwebtoken");
const config = require("../config.json");
const _ = require("lodash");
const ALLOWPATH = ['/create/pdf']
module.exports = function errorHandler() {
  return async (ctx, next) => {
    try {
      if (!_.includes(["GET", "OPTIONS"], ctx.method) && !_.includes(ALLOWPATH, ctx.path)) {
        if (!ctx.header || !ctx.header.authorization) {
          ctx.throw(401, "Need Authorization header");
        }
        const parts = ctx.header.authorization.split(" ");
        if (parts.length === 2) {
          const scheme = parts[0];
          const credentials = parts[1];
          if (/^Bearer$/i.test(scheme)) {
            // invalid token - synchronous
            try {
              let decoded = jwt.verify(credentials, config.secret);
              ctx.request.user = decoded;
            } catch (err) {
              ctx.throw(401, "Bad Authorization");
            }
          } else {
            ctx.throw(
              401,
              'Bad Authorization header format. Format is "Authorization: Bearer <token>"'
            );
          }
        }
      }
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      console.log(err.message);
    }
  };
};
