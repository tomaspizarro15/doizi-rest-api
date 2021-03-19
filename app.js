const Express = require('express');
const parser = require('body-parser');
const path = require('path')


const Mongoose = require('mongoose')

const registerRouter = require('./routes/auth/register')
const sessionRouter = require('./routes/auth/session')
const searchRouter = require('./routes/search/user_search')
const mainRouter = require('./routes/main');
const postRouter = require('./routes/post/post')
const groupsRouter = require('./routes/groups')
const multer = require('multer');
const user = require('./model/user');


const jwt = require('jsonwebtoken');

const App = Express();
const PORT = 8080;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ? cb(null, true) : cb(null, false)
}

App.use(Express.json())
App.use(multer().single('image'))
App.use('/images', Express.static(path.join(__dirname, 'images')))
App.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'GET , POST , PUT , PATCH , DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type , Authorization');
    next();
})

App.use('/user', registerRouter);
App.use('/session', sessionRouter);
App.use('/search:?', searchRouter)
App.use('/posts', postRouter)
App.use('/groups', groupsRouter)
App.use('/', mainRouter)

let server;

if (process.env.NODE_ENV === "test") {
    const Mockgoose = require('mockgoose').Mockgoose;
    const mock = new Mockgoose(Mongoose);
    mock.prepareStorage()
        .then(() => {
            Mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true })
                .then((res) => {
                    server = App.listen(PORT)
                    const io = require('./socket-connection').init(server)
                    io.on('connect', socket => {
                        console.log(socket.id)
                    })
                })
                .catch((err) => {
                    return err;
                })
        })
        .catch(err => {
            App.use((req, res, next) => {
                res.status(500).json({
                    error: err,
                    status: 500
                })
            })
        })

} else {
    Mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true })
        .then((res) => {
            server = App.listen(PORT)
            const io = require('./socket-connection').init(server)
            io.on('connect', socket => {
                console.log(socket.id)
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
module.exports = App;
