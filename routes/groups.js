const Router = require('express').Router();
const controller = require('./../controller/groups')

const auth = require('./../middleware/jwt-validity')

Router.get('/', auth , controller.getGroups)
Router.post('/', auth ,controller.postGroups)

module.exports = Router; 