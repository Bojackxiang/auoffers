const errorMessage = require('../message/error');
const successMessage = require('../message/success')
const db = require('../mysql/db')
const emailService = require('../emaiService/emailService')
const jwt = require('jsonwebtoken');
const sqlQuery = require('../query/query');
const env = require('../env/env')
const crypto = require("crypto");
const databaseFunctions = require('../mysql/databaseApi');
const state = require('../message/state');
const dataBaseApi = require('../mysql/databaseApi');

class UserController {
    constructor() {

    }

    static createUser(req, res, next) {
        const email = req.body.email;
        const password = req.body.password
        const school = req.body.school;
        const user = {
            email: email,
            password: password,
            school: school,
        }
        // *** starting to create token 
        const tokenId = crypto.randomBytes(16).toString("hex");
        user['token'] = tokenId;
        dataBaseApi.insertNewUser(user).then(resp => {
            res.send(resp);
        }
        );

        // *** sending the email to the user
        // emailService.sendVerifyEmail(email, )
    }

    static confirmationUser(req, res, next) {
        try {
            const verifyResult = jwt.verify(req.params.token, `testhelloworldtest`);
            if (verifyResult !== null) {
                const useremail = verifyResult.user.email;
                const mysql = `UPDATE users SET flag=TRUE where email='${useremail}'`;
                console.log(mysql);
                db.query(mysql, (err, result) => {
                    if (err) res.send({
                        status: 'wrong',
                        error: err
                    });
                    res.send({
                        status: 'correct',
                        result: result
                    });
                })
            }
        } catch (e) {
            res.send(e)
        }
    }

    static userLogin(req, res, next) {
        let userInfo = req.body;
        let username = userInfo.email;
        let userPassword = userInfo.password;
        dataBaseApi.findUser(req.body).then(response => {
            console.log(response);
            res.send({ ...response, email: username });
        })
        // db.query(sqlQuery.findUser(username))
        //     .then(data => {
        //         if (data.length > 0) {
        //             console.log(data);
        //             if (data[0].password == userPassword) {
        //                 let token = jwt.sign({
        //                     username: data[0].username,
        //                     email: data[0].email
        //                 }, env.secretKey, {
        //                     expiresIn: '1d'
        //                 });
        //                 let loginSucessMsg = successMessage.loginSuccess('login successfully', 200, token, data[0].username, );
        //                 res.send(loginSucessMsg);
        //             } else {
        //                 let error = errorMessage.errorMsg('wrong password', 401);
        //                 res.send(error);
        //             }
        //         } else {
        //             console.log('no such a user ')
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

    static retriveUserInfo(req, res, next) {
        let cate = req.query['cate'];
        let userId = req.query['id'];
        console.log(userId, cate);

        switch (cate) {
            case "intro":
                databaseFunctions.retriveUsersInfo('users', userId).then(data => {
                    console.log(data)
                    res.send(data);
                })
                break;

            case "resume":
                databaseFunctions.retriveUsersInfo('resume', userId).then(data => {
                    res.send(data);
                })

            case "history":
                databaseFunctions.retriveHistory('applications', userId).then(data => {
                    console.log(data);
                    res.send(data);
                })
                break;

            case "recm":
                sql = `select * from ${tableName} where userid='${userId}'`;
                databaseFunctions.retriveUsersInfo(sql).then(data => {
                    res.send()
                });
                break;
        }
    }

    static async userApply(req, res, next) {
        let jobId = req.body.postId;
        let studentid = req.body.userId;

        const id = crypto.randomBytes(16).toString("hex");
        let checkSql = `SELECT * FROM applications WHERE jobid='${jobId}' AND userid='${studentid}'`;
        let checkResult = await db.query(checkSql);
        if (checkResult.length > 0) {
            let error = errorMessage.errorMsg('repeat application', 401);
            res.send(error)
        } else {
            let insertSql = `INSERT INTO applications (id, jobid, userid) VALUES ('${id}', '${jobId}', '${studentid}')`;
            db.query(insertSql).then(resp => {
                let successMsg = successMessage.applySuccess('apply successfully', 200);
                res.send(successMsg);
            }).catch(err => {
                let errorMsg = errorMessage.applyError(err);
                res.send(errorMsg);
            });
        }
    }


}

module.exports = UserController;