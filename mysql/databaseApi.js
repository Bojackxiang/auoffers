const db = require('./db');
const state = require('../message/state');
const jwt = require('jsonwebtoken');

class Database {
    static retriveUsersInfo(tableName, userId) {
        let sql = `select * from ${tableName} where email='${userId}'`;
        return db.query(sql).then(data => {
            return data[0];
        }).catch(err => {
            return err;
        });
    }
    static retriveRecommendation() {

    }

    static retriveHistory(tableName, userId) {
        let sql = `select title, jobid from applications INNER JOIN posts ON applicationS.jobid = posts.postid WHERE userid='${userId}' LIMIT 10`;

        return db.query(sql).then(data => {
            return data;
        }).catch(err => {
            return err;
        });
    }

    static insertNewUser(user) {
        let sql = `INSERT INTO users(password, email, token) VALUES ('${user.password}', '${user.email}', '${user.token}')`;
        return db.query(sql).then(resp => {
            return state.insertNewUser('success', 200, 'insert the user successfully')
        }).catch(err => {
            return state.insertNewUser('fail', '402', err)
        });
    }

    static findUser(user) {
        console.log(user);
        let sql = `select * from users where email='${user.email}'`;
        return db.query(sql).then(data => {
            if (data.length > 0) {
                let token = jwt.sign({ data: user['email'] }, 'weijiexiangzhaodandan', { expiresIn: '24h' });
                return state.isFindTheUserSuccess('success', '200', 'find the user', token);
            } else {
                return state.isFindTheUserSuccess('fail', '404', 'not find the user');
            }
        }).catch(err => {
            console.log('internal error')
            console.log(err);
        })

    }

    static test() {
        console.log({
            'host': process.env.MYSQL_HOST,
            'user': process.env.MYSQL_USER,
            'password': process.env.MYSQL_SECRET,å
            'database': process.env.MYSQL_DB
        });
        let sql = `select * from posts`;
        console.log("get into the test")
        return db.query(sql).then(data => {
            console.log(data)
            return data;
        }).catch(err => {
            console.log(err)
            return err;
        });
    }
}

module.exports = Database;