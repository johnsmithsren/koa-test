const mysql = require('mysql')
const pool = mysql.createPool({
    host: '66.98.120.206',
    user: 'root',
    password: 'qwe123123',
    database: 'koa_vue',
    connectionLimit: 10,
    acquireTimeout: 10000,
    multipleStatements: true,
    queueLimit: 50
})

module.exports.query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}