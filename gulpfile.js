nvm;
/*
 * @Auther: renjm
 * @Date: 2019-08-23 14:21:13
 * @LastEditTime: 2019-08-25 19:28:29
 * @Description:
 */
("use strict");
const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const _ = require("lodash");
const eslint = require("gulp-eslint");
const pm2 = require("pm2");

// 当前运行环境
const env = _.get(process.argv.splice(2), 0, "dev");

function handleError(err) {
  console.error("building encounter error: ", err.message);
  process.exit(1);
}

function onWarning(error) {
  handleError.call(null, error);
}

// 语法检测
gulp.task("eslint", function() {
  return (
    gulp
      .src(["model/*/*.js"])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  );
});

// 生成配置文件、语法检测
// gulp.task(env, ["config", "eslint"], () => {});

// pm2启动运行环境
gulp.task("pm2", () => {
  let option = {
    name: require("./config.json").process,
    script: "/bin/start.js",
    env: {
      NODE_ENV: env
    }
  };
  pm2.connect(true, function() {
    pm2.start(option, function() {
      process.exit(0);
    });
  });
});
