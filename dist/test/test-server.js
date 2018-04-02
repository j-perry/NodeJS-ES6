'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = "test";

var server = require('../server').app;

var expect = _chai2.default.expect;

var url = "http://localhost:3000/People/api";

_chai2.default.use(_chaiHttp2.default);

describe('People', function () {
    describe('/user/create', function () {
        it('should create a new user with parameters passed as path variables', function (done) {
            var firstName = "Bob";
            var lastName = "Marley";

            _chai2.default.request(url).post('/user/create/' + firstName + '/' + lastName).end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
        });

        it('should create a new user object', function (done) {
            var user = {
                name: "Bob",
                surname: "Marley"
            };

            _chai2.default.request(url).post('/user/create').set("Content-Type", "application/json").send(user).end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe('/findAllUsers', function () {
        it('should find all users', function (done) {
            _chai2.default.request(url).get('/findAllUsers').end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body.user.length).to.be.greaterThan(1);
                expect(res).to.be.a.json;
                done();
            });
        });
    });

    describe('/findUser', function () {
        it('should find a user by their first name', function (done) {
            var name = "Bob";

            _chai2.default.request(url).get('/findUser/' + name).end(function (err, res) {
                expect(res).to.be.a.json;
                expect(res).to.have.status(200);
                expect(res.body.user.length).to.be.greaterThan(1);
                done();
            });
        });

        it('should find a user by their first and second name', function (done) {
            var name = "Bob";
            var surname = "Marley";

            _chai2.default.request(url).get('/findUser/' + name + '/' + surname).end(function (err, res) {
                expect(res).to.be.a.json;
                expect(res).to.have.status(200);
                expect(res.body.user.length).to.be.greaterThan(1);
                done();
            });
        });
    });

    describe('/user/update', function () {
        it('should update a user object(s)', function (done) {
            var user = {
                origFirstname: "Bob",
                origSurname: "Marley",
                newName: "Paul",
                newSurname: "McCartney"
            };

            _chai2.default.request(url).put('/user/update').set("Content-Type", "application/json").send(user).end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe('/user/delete', function () {
        it('should delete a user object(s)', function (done) {
            var user = {
                name: "Paul",
                surname: "McCartney"
            };

            _chai2.default.request(url).delete('/user/delete').set("Content-Type", "application/json").send(user).end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
        });
    });
});