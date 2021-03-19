const { getSession } = require("../../controller/main");
    
const controller = require('../../controller/main');
const express = require('express');
const { body, check } = require('express-validator');
const isValid = require("../../middleware/jwt-validity");
const router = express.Router();

router.get('/', isValid, controller.getSession)
router.get('/user' , isValid , controller.getUserById)
router.post('/log-in', [body('password').isString().isLength({ min: 8 }).withMessage("Invalid Credentials"), body('email').isEmail().withMessage('Invalid Credentials')], controller.logIn)
module.exports = router;    