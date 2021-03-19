const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const controller = require('../controller/main')
const isValid = require("../middleware/jwt-validity");
router.get('/', controller.main)
router.get('/session')
router.get('/users/:id', isValid, controller.getUserById)
module.exports = router;