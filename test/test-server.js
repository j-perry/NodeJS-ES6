process.env.NODE_ENV = "test";

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import 'babel-polyfill';
const server = require('../server').app;

import Family from '../models/family';
let expect = chai.expect;

const url = "http://localhost:3000/People/api";

chai.use(chaiHttp);

describe('People', () => {
    describe('/user/create', () => {
        it('should create a new user with parameters passed as path variables', (done) => {
            const familyMock = sinon.mock(new Family());
            const firstName = "Bob";
            const lastName = "Marley";

            chai.request(url)
                .post(`/user/create/${firstName}/${lastName}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
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
    });
    
    describe('/user/update', () => {
        it('should update a user object(s)', (done) => {
            const familyMock = sinon.mock(new Family());
            const origFirstname = "Bob";
            const origSurname = "Marley";
            const newName = "Paul";
            const newSurname = "McCartney";

            const user = {
                origFirstname: origFirstname,
                origSurname: origSurname,
                newName: newName,
                newSurname: newSurname
            }

            chai.request(url)
                .put(`/user/update`)
                .set("Content-Type", "application/json")
                .send(user)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('/user/delete', () => {
        it('should delete a user object(s)', (done) => {
            const familyMock = sinon.mock(new Family());
            const id = 1;
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