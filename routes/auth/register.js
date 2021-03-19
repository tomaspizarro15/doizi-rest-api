const express = require('express');
const router = express.Router();

const users = require('../../model/user')

const { body, check } = require('express-validator')
const controller = require('../../controller/auth')
router.get('/register', (req, res, next) => { res.status(200).json({ message: "lul" }) })

router.post('/register', [
    body('name').isString().isLength({ min: 2, max: 32 }).custom((value, { req }) => {
        const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
            const err = new Error(); 
        const isValid = regex.test(value);
        if (!isValid) {
            err.code = 409;
            return Promise.reject(err)
        }
        return Promise.resolve()
    }).withMessage("Invalid name"),
    body('lastname').isString().isLength({ min: 2, max: 32 }).custom((value, { req }) => {
        const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
            const err = new Error(); 
        const isValid = regex.test(value);
        if (!isValid) {
         
            err.code = 409;
            return Promise.reject(err)
        }
        return Promise.resolve()
    }).withMessage("Invalid lastname"),
    body('username').custom(async (value, { req }) => {
        const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
        const isValid = regex.test(value);
        const user = await users.findOne({ username: req.body.username })
        if (user) {
            const error = new Error();
            error.message = "Username is taken!"
            error.code = 409;
            return Promise.reject(error)
        }
        if (isValid) {
            return Promise.resolve();
        }
        return Promise.reject();
    }).isLength({ min: 6, max: 18 }).withMessage("Invalid Username"),
    body('email').isEmail().withMessage("Email must be valid").custom(async (value) => {
        const user = await users.findOne({ email: value })
        if (user) {
            const err = new Error();
            err.message = "this email is taken";
            err.code = 409;
            return Promise.reject(err);
        }
        return Promise.resolve();
    }),
    body('password').isString().isLength({ min: 8, max: 64 }).custom((value, { req }) => {
        if (req.body.confirmation === value) {
            return Promise.resolve()
        }
        const err = new Error()
        err.code = 409
        err.message = "Passwords do not match"
        return Promise.reject(err)
    }),
    body('country').isString().isLength({ min: 4            , max: 32 }).withMessage("Invalid Country")
], controller.registerUser)

module.exports = router;        