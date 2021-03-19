const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { ObjectID } = require('mongodb');

const Schema = mongoose.Schema;

const Post = new Schema({
    userId: String,
    username: String,
    userFullName: String,
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Array,
        user: String,
        userId: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('posts', Post)  