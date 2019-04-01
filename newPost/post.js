const crypto = require("crypto");
const multer = require('multer');
const path = require('path');
const db = require('../mysql/db')
const successMsg = require('../message/success');
const errorMsg = require('../message/error');


/**
 * * image uploading function
 */
storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cd) => {
        const id = crypto.randomBytes(16).toString("hex");
        cd(null, id + "-" + file.originalname + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
}).single("image");
// ! 上面的这个image名字要和进来的数据的名字相同，在这步直接将图片存进数据库里面


/**
 * *Posting class
 */
class Post {
    constructor() {}

    static mockData(req, res) {
        for (let i = 1; i < 100; i++) {
            let title = `the mock data is ${i}`
            let postid = crypto.randomBytes(16).toString("hex");
            let description = '<h1>test title</h1><p>Java是一种广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性，广泛应用于企业级Web应用开发和移动应用开发。</p><p>Java编程语言的风格十分接近C++语言。继承了C++语言面向对象技术的核心，舍弃了容易引起错误的指针，以引用取代；移除了C++中的运算符重载和多重继承特性，用接口取代；增加垃圾回收器功能。在Java SE 1.5版本中引入了泛型编程、类型安全的枚举、不定长参数和自动装/拆箱特性。太阳微系统对Java语言的解释是：“Java编程语言是个简单、面向对象、分布式、解释性、健壮、安全与系统无关、可移植、高性能、多线程和动态的语言”</p>';
            let author = "weijie xiang";
            let randomNumber = Math.floor(Math.random() * 10);
            let area = '';
            let category = '';
            if (randomNumber < 3) {
                area = '墨尔本';
                category = "it"
            } else if (randomNumber >= 3 && randomNumber < 7) {
                area = '悉尼';
                category = "推销员"
            } else {
                area = '堪培拉';
                category = "志愿者"
            }
            const sql = `INSERT INTO posts(postid, title, content, author, area, category) VALUE('${postid}', '${title}', '${description}', '${author}', '${area}', '${category}') `
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result);
                }
            });
        }
    }

    static async newPost(req, res) {
        let postContent = req.body;
        const generatedId = crypto.randomBytes(16).toString("hex");
        postContent['postId'] = generatedId;
        
        
        let sql = `INSERT INTO posts(postid, title, content, author, area, category) VALUE('${postContent.postId}', '${postContent.title}', '${postContent.description}', '${postContent.author}', '${postContent.area}', '${postContent.category}')`;
        db.query(sql, (err, result) => {
            if (err) {
                let errorResp = errorMsg.postingActionError('err')
                res.send(errorResp)
            } else {
                let successResp = successMsg.postSuccess();
                res.send(successResp)
            }
        });


    }

    static gettingPostsFromDatabase(req, res) {
        console.log('getting data from database')
    }
}


module.exports = Post;