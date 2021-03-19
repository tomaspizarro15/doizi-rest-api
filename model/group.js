const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { ObjectID } = require('mongodb');

const Schema = mongoose.Schema;

const group = new Schema({
    admin: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    members:
    {
        type: Array,
        member_id: String
    }
    ,
    pendingUsers: {
        type: Array,
        pendingMemberId: String

    },
    progress: {
        type: Number,
        required: false,
        default: 0,
    },
    branches: {
        type: Array,
        id: ObjectID,
        required: false,
        name: {
            type: String,
            default: "Grupo de trabajo"
        },
        tasks: {
            type: Array,
            required: false,
            taskId: ObjectID,
            userId: {
                type: String,

            },
            name: {
                type: String,

                default: 'tarea-sin-nombre'
            },
            description: String,
            asignedUsers:
            {
                type: Array,
                userId: String
            },
            completed: {
                type: Boolean,
                default: false,
            },
        },
        progress: {
            type: Number,
            default: 0,
        },
    },
    chat: {
        messages:
        {
            type: Array,
            id: ObjectID,
            userId: String,
            msg: String
        }

    }
})

module.exports = mongoose.model('groups', group)