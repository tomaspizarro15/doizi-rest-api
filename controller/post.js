
const Post = require('./../model/post')
const User = require('./../model/user')
const jwt = require('jsonwebtoken')
const socketConnection = require('./../socket-connection')
//get all 

exports.getAll = async (req, res, next) => {

    try {
        const posts = await Post.find()
        res.status(200).json({
            posts: posts,
            status: 200,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            posts: [],
            status: 500,
        })
    }
}
// get one
exports.getById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.query.q);
        try {
            const user = await User.findById(post.userId).select('name lastname -_id');
            res.status(200).json({
                status: 200,
                post: post,
                user: user,
            })
        } catch (error) {
            return error;
        }
    } catch (error) {
        console.log
        res.status(500).json({
            error: 500,
            message: 'Server Internal Error'
        })
    }
}
exports.post = async (req, res, next) => {

    const token = jwt.verify(req.get('Authorization'), '15703728')
    try {
        const createdPost = await Post.create({ userFullName : token.userFullName, username: token.username, userId: token.id, content: req.body.content });
        res.status(201).json({
            status: 201,
            result: createdPost,
        })
        socketConnection.get().emit('new_post', {
            action: 'news added',
            post : createdPost,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            result: undefined,
        })
    }
}
//delete
exports.delete = (req, res, next) => {
    res.status(200).json({
        status: 200,
        method: "delete"
    })
}
