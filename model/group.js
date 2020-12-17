const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { ObjectID } = require('mongodb');

const Schema = mongoose.Schema;

const group = new Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: Object,
        required: true,
    },
    members: [
        {member_id: String}
    ],
    tier : {
        type : Number,
        default : 1,
        required : false,
    }
})

module.exports = mongoose.model('groups', group)