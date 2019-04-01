const mysql = require('mysql')
const env = require('../env/env')

const dbConfig = {
    host: env.local_host,
    port: env.local_port,
    // port: "var/run/mysqld/mysqld.sock",
    user: env.local_user,
    password: env.local_password,
    database: env.local_database,
    acquireTimeout: 15000, // 连接超时时间
    connectionLimit: 100, // 最大连接数
    waitForConnections: true, // 超过最大连接时排队
    queueLimit: 0, // 排队最大数量(0 代表不做限制)
}

const pool = mysql.createPool(dbConfig);

const db = {
    // 执行
    query: (sql, para) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) return reject(err);
                conn.query(sql, para, (err, rows) => {
                    console.log('db connect successfully');
                    conn.release();
                    if (err) return reject(err);
                    return resolve(rows);
                });
            });
        });
    }
};

module.exports = db;