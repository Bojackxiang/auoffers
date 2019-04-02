const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const databaseApi = require("./mysql/databaseApi");

// * modules imports
const userController = require('./users_controller/controller');
const searching = require('./searching/searching')
const post = require('./newPost/post');

// ! logging is still on holdå
// const log4js = require('./log4js/log4js');




const corsOptions = {
    origin: "178.128.14.161",
    optionsSuccessStatus: 200
}
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions))

// *** setting up database
require('./mysql/db')

/**
 * * routes
 */

 // * user routing
app.post('/register', jsonParser, userController.createUser);
app.get('/confirmation/:token', jsonParser, userController.confirmationUser);
app.post('/usersignin', jsonParser, userController.userLogin);
app.get('/userInfo', userController.retriveUserInfo);
app.post('/userapply',jsonParser, userController.userApply);

// * post routing
app.get('/search', searching.revtriveListingResults);
app.post('/newjobpost', jsonParser, post.newPost);
// app.post('/mockdata', post.mockData, );
app.get('/jobDescription/:id', searching.retriveJobDescription);


// this is for nginx testing purpose
app.get("/api", databaseApi.test)

app.listen(3000, () => {
    console.log('port starts at 3000')
});
