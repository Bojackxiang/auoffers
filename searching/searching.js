const db = require('../mysql/db')

class Searching {
    constructor() {}

    /**
     * listing thesearching result
     */

    static async revtriveListingResults(req, res) {
        console.log('revtriveListingResults');
        let numPerPage = 10;
        let pageNumber = req.query['page'];

        var skip = parseInt(pageNumber - 1) * numPerPage;

        const countSql = `SELECT COUNT(postid) as totalCount FROM posts`;
        const sqlNumber = await db.query(countSql);
        console.log("trying to have the num of row");
        let numberOfRow = sqlNumber[0].totalCount;

        // computed home many page is required
        let totalPageNumber = await Math.ceil(numberOfRow / numPerPage);
        console.log(skip);
        
        //* retrive the job info
        let data = await db.query(`SELECT * FROM posts ORDER BY postdate DESC LIMIT 10 offset ${skip}`);
        console.log("trying to have the data")
        console.log(data)
        res.send(JSON.stringify({
            data: data,
            totalPageNumber: totalPageNumber
        }));
    }

    static retriveJobDescription(req, res){
        console.log('job detials')
        let jobId = req.params.id;
        let sql = `SELECT * FROM posts WHERE postId='${jobId}'`;
        db.query(sql).then(data=>{
            res.send(data[0])
        }).catch(err=>{
            console.log(err)
        })
    }

}

module.exports = Searching;