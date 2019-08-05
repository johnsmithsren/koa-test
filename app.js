const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const config = require("./config.json");
const logger = require("koa-logger");
const cors = require("koa-cors");
const fs = require("fs");
// const index = require('./routes/index')
const user = require("./routes/user");
// const session = require("koa-session2");
// const Store = require("./util/store.js");
const errorHandle = require("./middlewares/errorHandle");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
// json 化
app.use(json());
// log
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
app.use(errorHandle());
app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(cors());
// routes
fs.readdirSync(__dirname + "/routes").forEach(file => {
  if (/(\.js)$/.test(file)) {
    const route = require(__dirname + "/routes/" + file);
    app.use(route.routes());
  }
});
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
