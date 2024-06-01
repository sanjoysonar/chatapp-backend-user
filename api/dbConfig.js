const mongoose = require("mongoose");

const userModelSchema = require("./models/userModel");


const dbConfig = (req, res, next) => {
    if(!global.conn) {
        global.conn = mongoose.createConnection('mongodb://localhost:27017/chatapplicationusers');
    }

    req.db = {
        'userModel': global.conn.model('users', userModelSchema)
    };

    global.db = req.db;
    next();
}

module.exports = dbConfig;