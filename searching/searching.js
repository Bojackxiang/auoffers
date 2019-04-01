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
        console.log(req.query.page);

        var skip = parseInt(pageNumber - 1) * numPerPage;
        console.log(skip);

        const countSql = `SELECT COUNT(postid) as totalCount FROM posts`;
        const sqlNumber = await db.query(countSql);
        let numberOfRow = sqlNumber[0].totalCount;
        // computed home many page is required
        let totalPageNumber = await Math.ceil(numberOfRow / numPerPage);
        //* retrive the job info
        let data = await db.query(`SELECT * FROM posts ORDER BY postdate DESC LIMIT 10 offset ${skip}`);
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