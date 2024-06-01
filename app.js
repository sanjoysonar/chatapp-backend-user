// index.js
const express       = require("express");
const http          = require('http');
const helmet        = require('helmet');
const bodyParser    = require("body-parser");
const router        = express.Router();

const app = express();

const hostname = 'localhost';
const port = process.env.PORT || 3000;

app.use(helmet());

app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb"}));

var global = {};

global.saltRounds = 10;

const dbConfig = require("./api/dbConfig");
app.use(dbConfig);

const routes = require("./api/routes");
routes(app);

//Handling 404 error
app.use((req, res)=> {
    let errObj = {};

    errObj.status   = "fail";
    errObj.msg      = "No such url found";

    res.json(errObj);
});

//Handling 500 error
app.use((error, req, res)=> {
    let errObj = {};

    errObj.status   = "fail";
    errObj.msg      = error.message;
    
    res.json(errObj);
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});