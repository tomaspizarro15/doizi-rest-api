const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user')
const Groups = require('../model/group')
const group = require('../model/group')
exports.getUserGroup = async (req, res, next) => {
    try {
        const token = jwt.verify(req.get('Authorization'), '15703728');
        try {
            const groups = await Groups.find({ adminId: token.id })
            res.status(200).json({
                status: 200,
                groups: groups,
            })
        } catch (error) {
            return error;
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

exports.main = async (req, res, next) => {
    try {
        const users = await User.find({
            _id: {
                $in: ['6026d6c05573ad0890e0c060', '602545a9ab9be4192871c48d', '6026d67c5573ad0890e0c05e']
            }
        }).select('username name lastname')
        res.status(200).json({
            status: 200,
            users: users
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            users: []
        })
    }
}
const socketConnection = require('../socket-connection')

exports.getSession = async (req, res, next) => {
    try {
        const token = jwt.verify(req.get('Authorization'), '15703728')
        const user = await User.findOne({ _id: token.id }).select('-password')
        if (user) {
            res.status(200).json({
                status: 200,
                token: token,
                user: user,
            })
        } else {
            res.status(401).json({
                status: 401,
                token: "Not found"
            })
        }
    } catch (error) {
        res.status(401).json({
            status: 401,
            token: token,
        })
        console.log(error)
    }
}
exports.getUserById = async (req, res, next) => {
    console.log(req.connection.remoteAddress)
    res.status(200).json({
        status: 200,
        message: "Good to see ya!",
        test: req.params.id
    })
}
exports.logIn = async (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
                if (!passwordIsValid) {
                    res.status(401).json({
                        status: 401,
                        error: "Contraseña o Email incorrecto",
                    })
                } else {
                    const token = jwt.sign({
                        email: user.email,
                        id: user.id,
                        username: user.username,
                        userFullName : user.name + ' ' + user.lastname,
                        role: user.role,
                    }, '15703728', { expiresIn: '2h' })
                    res.status(200).json({
                        status: 200,
                        session: token
                    })
                }
            } else {
                res.status(401).json({
                    status: 401,
                    error: "Email incorrecto"
                })
            }
        } catch (err) {
            res.status(500).json({
                err: error
            })
        }
    } else {
        res.status(401).json({
            status: 401,
            error: errors.errors[0].msg
        })
    }
}