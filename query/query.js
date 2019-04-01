module.exports = {
    findUser: (username, )=>{
        return  `SELECT * FROM users WHERE USERNAME='${username}'`;
    }
}