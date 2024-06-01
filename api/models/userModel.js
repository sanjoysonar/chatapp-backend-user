'use strict';
const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
    name: {
        type: String
    }, 
    email: {
        type: String
    },
    contact: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = userModelSchema;