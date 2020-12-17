const user = require('../model/user')
const encrypter = require('bcrypt')
const { validationResult } = require('express-validator')
exports.registerUser = async (req, res, next) => {
    const encryptedPassword = await encrypter.hash(req.password, 12)
    const err = validationResult(req);
    if (err.isEmpty()) {
        try {
            const newUser = await user.create({
                name: req.body.name,
                lastname: req.body.lastname,
                username: req.body.username,
                email : req.body.email, 
                country : req.body.country, 
                password: encryptedPassword,
            });
            res.status(201).json({
                result : newUser,
                status : 201,
            })
            console.log(newUser)
        } catch (error) {
            res.status(500).json({
                error: error,
            })
        }
    } else {
        res.status(401).json({

        })
    }
}