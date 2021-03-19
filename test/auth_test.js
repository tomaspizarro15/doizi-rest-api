process.env.NODE_ENV = "test"

const { expect } = require('chai');
const request = require('supertest');
const app = require('./../app')

const isValid = require('./../middleware/jwt-validity');
    
    it("Throw 401 status code", (done) => {
        request(app).get('/session/user').send()
            .then((res) => {
                console.log(res.status)
                expect(res.status).to.equal(401)
                done();
            }).catch(err => {
                done(err);
                throw new Error(err)
                
            })
    })
    it("Throw 200 status code", (done) => {
        request(app).get('/').send()
            .then((res) => {
                console.log(res.status)
                expect(res.status).to.equal(200)
                done();
            }).catch(err => {
                done(err);
                throw new Error(err)
                
            })
    })



