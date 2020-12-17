const express = require('express');
const router = express.Router();

const users = require('../../model/user')

const { body, check } = require('express-validator')
const controller = require('../../controller/auth')
router.get('/register', (req, res, next) => { res.status(200).json({ message: "lul" }) })
router.post('/register', [
    body(['name', 'lastname']).isString().isLength({ min: 2, max: 32 }).withMessage("Incorrect credencials"),
    body('email').isEmail().custom(async (value) => {
        const user = await users.findOne({ email: value })
        if (user) {
            const err = new Error();
            err.message = "Email in use";
            err.code = 409;
            Promise.reject(err);
        }
        Promise.resolve();
    }),
    body('password').isString().isLength({ min: 8, max: 64 }),
    body('confirmation').isString().custom((value, { req }) => { 
        if (value === req.body.password) {
            Promise.resolve()
        } else {
            const err = new Error();
            err.message = "Password's dont match";
            err.code = 409;
            Promise.reject(err);
        }
    })
], controller.registerUser)

module.exports = router; 