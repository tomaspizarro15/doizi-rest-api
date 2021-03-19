const user = require('../model/user');
const encrypter = require('bcrypt');
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer');
const sendgrid = require('@sendgrid/mail')

const { validationResult } = require('express-validator')
exports.registerUser = async (req, res, next) => {
    const encryptedPassword = await encrypter.hash(req.body.password, 12)
    const encryptedAddress = await encrypter.hash(req.connection.remoteAddress, 12)
    const err = validationResult(req);
    if (err.isEmpty()) {
        try {
            const newUser = await user.create({
                name: req.body.name,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                country: req.body.country,
                password: encryptedPassword,
                mainIPAddress: encryptedAddress,
            });
            const token = jwt.sign({
                email: newUser.email,
                username: newUser.username,
                userFullName: newUser.name + ' ' + newUser.lastname,
                role: newUser.role,
                id: newUser._id,
            }, '15703728', { expiresIn: '2h' })
            res.status(201).json({
                result: newUser,
                status: 201,
                token: token,
            })
            sendgrid.setApiKey(process.env.SENDGRID_KEY)
            const emailMessage = {
                from: 'webdoiziorg@gmail.com',
                to: newUser.email,
                subject: 'Sign-Up in Doizi',
                text: 'Account created!',
                html: '<div><h1>Account created succesfully</h1><p>Welcome to doizi web. we appreciate people who supports us!</p></div>'
            }
            const emailSended = await sendgrid.send(emailMessage)
        } catch (error) {
            res.status(500).json({
                errors: error,
                this: "this"
            })
        }
    } else {
        const errors = err.array();
        res.status(401).json({
            errors: errors,
            status: 401,
        })
    }
}