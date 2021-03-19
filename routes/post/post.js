const Router = require('express').Router();;
const Controller = require('../../controller/post')

Router.get('/', Controller.getAll)

Router.get('/full-post?:q', Controller.getById)

Router.post('/post', Controller.post)

Router.delete('/delete', Controller.delete)

module.exports = Router; 