const jwt = require('jsonwebtoken')
const Group = require('./../model/group')
const User = require('./../model/user')
exports.getGroups = async (req, res, next) => {
    try {
        const sessionToken = jwt.verify(req.get('Authorization'), '15703728')
        const user = await User.findById(sessionToken.id);
        const invitations = await Group.find().where({ _id: { $in: user.invitations } }).select('title  description admin -_id')
        const groups = await Group.find().where({
            $or: [
                { 'admin': sessionToken.id },
                { 'members': { 'member_id': sessionToken } }
            ]
        })
        res.status(200).json({
            status: 200,
            groups: groups,
            invites : invitations,
        })
    } catch (error) {
        console.log(error)
    }
}
exports.postGroups = async (req, res, next) => {
    try {
        const newGroup = await Group.create({
            admin: req.body.admin,
            title: req.body.title,
            description: req.body.description,
            members: req.body.members,
            pendingUsers: req.body.pendingUsers,
        })
        try {
            const newGroupInvitation = newGroup._id
            const updatedUsers = await User.updateMany(
                { _id: { $in: req.body.pendingUsers } },
                { $push: { invitations: newGroupInvitation } },
                { multi: true }
            )
            // const io = socketConnection.get();
            // console.log(io)
            // socketConnection.get().emit('invitation', {
            //     action: 'invitation received!', group: newGroupInvitation._id
            // })
            res.status(201).json({
                status: 201,
                group: newGroup
            })
        } catch (error) {
            throw new Error(error);
        }
    } catch (err) {
        res.status(500).json({
            error: "Database Error",
            status: 500,
        })
        throw new Error(err)
    }
}