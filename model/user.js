const mongoose = require('mongoose')
const mongodb = require('mongodb');
const { ObjectID } = require('mongodb');
const { ObjectId } = require('mongodb');
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
    tier: {
        type: String,
        required: false,
        default: 'free',
    },
    role: {
        type: String,
        required: false,
        default: "",
    },
    groups: [
        { groupId: String }
    ],
    invitations: {
        type: Array,
        group: String,
    },
    chats: {
        type: Array,
    },
    goals: {
        type: Array,
        required: false,
        goalsId: ObjectId,
        name: {
            type: String,
            required: true
        },
        progress: {
            type: Number,
            default: 0,
            required: false,
        },
        tasks: [
            {
                id: ObjectId,
                name: {
                    type: String,
                    required: false,
                    status: Boolean
                }
            }
        ]
    },
    socketIp: {
        type : String,
        default : 'null',
    },
    
    mainIPAddress: {
    type: String,
    required: true
},
    devices: [
    {
        id: {
            type: String,
        }
    }
],
    friends: {
    number: { type: String, default: 0, required: false },
    friendList: [
        {
            id: {
                type: String
            }
        }
    ]
},
    blockedUsers: {
    number: { type: String, default: 0, required: false },
    blockList: [
        {
            type: String
        }
    ]
},


})
module.exports = mongoose.model('users', user)