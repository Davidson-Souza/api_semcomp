'use strict'
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        trim: true,
        required:[true, "Email is required"]
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    bookmarks: [String]
});

module.exports = Mongoose.model("User", User);