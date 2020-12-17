const mongoose = require('mongoose')
const mongodb = require('mongodb');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    groups: [
        { groupId: String, }
    ],
    role: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('users', user)