process.env.NODE_ENV = "test";

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import 'babel-polyfill';
const server = require('../server').app;

let expect = chai.expect;

const url = "http://localhost:3000/People/api";

chai.use(chaiHttp);

describe('People', () => {
    describe('/user/create', () => {
        it('should create a new user with parameters passed as path variables', (done) => {
            const firstName = "Bob";
            const lastName = "Marley";

            chai.request(url)
                .post(`/user/create/${firstName}/${lastName}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();           
                });
        });

        it('should not create a new user with parameters passed as path variables and return a 404 status', (done) => {
            const firstName = "Paul";
            const lastName = "Marley";

            chai.request(url)
                .post(`/user/create/${firstName}/`)
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });

        it('should create a new user object', (done) => {
            const user = {
                name: "Bob",
                surname: "Marley"
            };

            chai.request(url)
                .post('/user/create')
                .set("Content-Type", "application/json")
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should not create a new user object and return a 404 status', (done) => {
            const user = {
                firstName: "Paul",
                lastName: "Marley"
            };

            setTimeout(done, 0);

            chai.request(url)
                .post('/user/create')
                .set('Content-Type', 'application/json')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done();
                });
        });

    });

    describe('/findAllUsers', () => {
        it('should find all users', (done) => {
            chai.request(url)
                .get('/findAllUsers')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.length).to.be.greaterThan(1);
                    expect(res).to.be.a.json;
                    done();
                });
        });
    });

    describe('/findUser', () => {
        it('should find a user by their first name', (done) => {
            const name = "Bob";

            chai.request(url)
                .get(`/findUser/${name}`)
                .end(function (err, res) {
                    expect(res).to.be.a.json;
                    expect(res).to.have.status(200);
                    expect(res.body.user.length).to.be.greaterThan(1);
                    done();
                });
        });

        it('should not find a user by their first name', (done) => {
            const name = "Charlie";

            chai.request(url)
                .get(`/findUser/${name}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.length).to.eql(0);
                    done();
                });
        });

        it('should find a user by their first and second name', (done) => {
            const name = "Bob";
            const surname = "Marley";

            chai.request(url)
                .get(`/findUser/${name}/${surname}`)
                .end(function (err, res) {
                    expect(res).to.be.a.json;
                    expect(res).to.have.status(200);
                    expect(res.body.user.length).to.be.greaterThan(1);
                    done();
                });
        });

        it('should not find a user by their first name and second name', (done) => {
            const name = "Charlie";
            const surname = "Brown";

            chai.request(url)
                .get(`/findUser/${name}/${surname}`)
                .end(function (err, res) {
                    expect(res.body.user.length).to.eql(0);
                    done();
                });
        });
    });
    
    describe('/user/update', () => {
        it('should not update a user object(s) and return a 500 status', (done) => {
            const user = {
                origFirstname: "Bob",
                origSurname: "Marley",
                firstName: "Paul",
                surname: "McCartney"
            };

            chai.request(url)
                .put(`/user/update`)
                .set("Content-Type", "application/json")
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(500);
                    done();
                });
        });

        it('should update a user object(s)', (done) => {
            const user = {
                origFirstname: "Bob",
                origSurname: "Marley",
                newName: "Paul",
                newSurname: "McCartney"
            };

            chai.request(url)
                .put(`/user/update`)
                .set('Content-Type', 'application/json')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('/user/delete', () => {
        it('should not delete a user object(s) and return a 500 status', (done) => {
            const user = {
                name: "Pau",
                surname: ""
            };

            chai.request(url)
                .delete('/user/delete')
                .set('Content-Type', 'application/json')
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(500);
                    done();
                });
        });

        it('should delete a user object(s)', (done) => {
            const user = {
                name: "Paul",
                surname: "McCartney"
            };

            chai.request(url)
                .delete('/user/delete')
                .set("Content-Type", "application/json")
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});