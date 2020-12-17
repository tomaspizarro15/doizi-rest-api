const Express = require('express');
const parser = require('body-parser')
const Mongoose = require('mongoose')

const registerRoute = require('./routes/auth/register')

const App = Express();
const PORT = 8080;

App.use(parser.json())
App.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'GET , POST , PUT , PATCH , DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type , Authorization');
    next();
})

App.use('/user' , registerRoute)

Mongoose.connect('mongodb+srv://tomas-pizarro:15703728@cluster0.icsiq.mongodb.net/doizi?authSource=admin&replicaSet=atlas-vvbm8g-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true')
    .then((res) => {
        console.log(res)
        App.listen(PORT)
    })
    .catch((err) => {
        console.log(err)
    })  