/*
 * @Auther: renjm
 * @Date: 2019-08-13 11:38:30
 * @LastEditTime: 2019-08-23 10:30:12
 * @Description:
 */
// const fs = require("fs");
// const path = require("path");
// const mongoose = require("mongoose"); //引用mongoose模块
// const config = require("../config.json");
// const log4js = require("log4js");
// log4js.configure({
//   appenders: { mongo: { type: "console" } },
//   categories: {
//     default: { appenders: ["mongo"], level: "INFO" }
//   }
// });
// const logger = require("log4js").getLogger("mongo");
// let url =
//   "mongodb://" +
//   config.mongoDB.host +
//   ":" +
//   config.mongoDB.port +
//   "/" +
//   config.mongoDB.database;
// const mongo = mongoose.createConnection(url, { useNewUrlParser: true }); //创建一个数据库连接

// let db = {
//   mongoose: mongoose,
//   mongo: mongo,
//   models: {}
// };
// // 错误
// mongo.on("error", function(err) {
//   logger.error(new Error(err));
// });
// // 开启
// mongo.once("open", function() {
//   logger.info("mongo is opened");
// });
// // 整合models文件下的其他js文件
// let mongoModelPath = path.join(__dirname, config.mongoDB.mongoModel);
// fs.readdirSync(mongoModelPath)
//   .filter(function(file) {
//     return file.indexOf(".") !== 0 && file !== "index.js";
//   })
//   .forEach(function(file) {
//     var modelFile = require(path.join(mongoModelPath, file));
//     var schema = new mongoose.Schema(modelFile.schema);

//     db.models[modelFile.schemaName] = mongo.model(
//       modelFile.name,
//       schema,
//       modelFile.name
//     );
//   });
// // 根据name选择model
// db.getModel = function(name) {
//   return this.models[name];
// };

// module.exports = db;
