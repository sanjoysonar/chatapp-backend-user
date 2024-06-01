const mongoose  = require("mongoose");
const bcrypt    = require("bcrypt");

const userController = {};

const fs = require("fs");

userController.responseData = function (resObj, res, callback, status) {

    if(status === undefined) {
        status = 200;
    }
    if(callback.name != "next") {
        callback(resObj);
    } else {
        res.status(status).send(resObj);
    }
}

userController.create = async function (req, res, callback) {

    const userModel = req.db.userModel;
    let resObj = {};
    resObj.status = 'fail';

    let name        = req.body.name;
    let email       = req.body.email;
    let contact     = req.body.contact;
    let password    = req.body.password;

    if(name === undefined) {
        resObj.msg = "Please provide name";
        userController.responseData(resObj, res, callback, 400);
        return;
    } else if(email === undefined) {
        resObj.msg = "Please provide email";
        userController.responseData(resObj, res, callback, 400);
        return;
    } else if(contact === undefined) {
        resObj.msg = "Please provide contact";
        userController.responseData(resObj, res, callback, 400);
        return;
    } else if(password === undefined) {
        resObj.msg = "Please provide password";
        userController.responseData(resObj, res, callback, 400);
        return;
    }

    
    let bPassword = await bcrypt.hash(password, 10);

    let obj = {};

    obj.name        = name;
    obj.email       = email;
    obj.contact     = contact;
    obj.password    = bPassword;

    const user = new userModel(obj);
    let result = await user.save();

    resObj._id     = result._id;
    resObj.status   = 'success';
    resObj.code     = 200;


    userController.responseData(resObj, res, callback, 501);
    return
}

userController.list = async function (req, res, callback) {

    const userModel = req.db.userModel;
    let resObj = {};

    let users = await userModel.find();

    for(let user of users) {
        console.log(user.name)
    }

    resObj.data     = users;
    resObj.status   = 'success';
    resObj.code     = 200;


    userController.responseData(resObj, res, callback, 501);
    return
}

module.exports = userController;