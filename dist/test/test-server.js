'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

require('babel-polyfill');

var _family = require('../models/family');

var _family2 = _interopRequireDefault(_family);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = "test";

var server = require('../server').app;

var expect = _chai2.default.expect;

var url = "http://localhost:3000/People/api";

_chai2.default.use(_chaiHttp2.default);

describe('People', function () {
    describe('/user/create', function () {
        it('should create a new user with parameters passed as path variables', function (done) {
            var familyMock = _sinon2.default.mock(new _family2.default());
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
            // const familyMock = sinon.mock(new Family({ name: user.name, surname: user.surname }));
            // const family = familyMock.object;
            // const expectedResult = { status: true };

            // familyMock.expects('find').yields(null, expectedResult);
            // Family.find(function(err, result) {
            //     familyMock.verify();
            //     familyMock.restore();
            //     expect(result.status).to.be.true;
            //     done();
            // });

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
                //expect(res.length).to.be.gt(0);
                expect(res).to.be.a.json;
                done();
            });
        });

        /* it('should have http status 200', function (done) {
            //const familyMock = sinon.mock(new Family());
             chai.request(url)
                .get('/findAllUsers')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
         it('should be a json object', (done) => {
            const familyMock = sinon.mock(new Family());
             chai.request(url)
                .get('/findAllUsers')
                .end(function (err, res) {
                    expect(res).to.be.a.json;
                    done();
                });
        }); */
    });

    describe('/findUser/:name', function () {
        it('should find a user by their first and second name', function (done) {
            _chai2.default.request(url).get('/findUser/' + name + '/' + surname).end(function (err, res) {
                expect(res).to.be.a.json;
                expect(res).to.have.status(200);
                expect(res.body).to.have.length.greaterThan(0);
                done();
            });
        });
    });

    describe('/user/update', function () {
        it('should update a user object(s)', function (done) {
            var familyMock = _sinon2.default.mock(new _family2.default());
            var origFirstname = "Bob";
            var origSurname = "Marley";
            var newName = "Paul";
            var newSurname = "McCartney";

            var user = {
                origFirstname: origFirstname,
                origSurname: origSurname,
                newName: newName,
                newSurname: newSurname
            };

            _chai2.default.request(url).put('/user/update').set("Content-Type", "application/json").send(user).end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe('/user/delete', function () {
        it('should delete a user object(s)', function (done) {
            var familyMock = _sinon2.default.mock(new _family2.default());
            var id = 1;
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