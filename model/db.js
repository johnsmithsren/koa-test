/*
 * @Auther: renjm
 * @Date: 2018-05-01 17:10:07
 * @LastEditTime: 2019-08-13 11:51:03
 * @Description:
 */
const mysql = require("mysql");
const config = require("../config.json");
const pool = mysql.createPool({
  host: config.mysqlDB.host,
  user: config.mysqlDB.user,
  password: config.mysqlDB.password,
  database: config.mysqlDB.database,
  connectionLimit: 10,
  acquireTimeout: 10000,
  multipleStatements: true,
  queueLimit: 50
});

module.exports.query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
