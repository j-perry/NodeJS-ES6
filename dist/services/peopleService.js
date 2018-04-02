'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _people = require('../models/people');

var _people2 = _interopRequireDefault(_people);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var url = "mongodb://127.0.0.1/saturday";

var excludeFields = '-_id -__v';

var PeopleService = function () {
  function PeopleService() {
    _classCallCheck(this, PeopleService);

    _bluebird2.default.promisifyAll(_mongoose2.default);
    _mongoose2.default.connect(url);

    _mongoose2.default.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + url);
    });

    // if the connection throws an error
    _mongoose2.default.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    _bluebird2.default.promisifyAll(_people2.default)(_mongoose2.default);
  }

  _createClass(PeopleService, [{
    key: 'findAllUsers',
    value: async function findAllUsers() {
      return _bluebird2.default.all([_people2.default.find({}, excludeFields)]).spread(function (user) {
        console.log("user: " + user);
        return { user: user };
      });
    }
  }, {
    key: 'findUserByFirstName',
    value: async function findUserByFirstName(name) {
      return _bluebird2.default.all([_people2.default.find({ name: name }, excludeFields)]).spread(function (user) {
        return { user: user };
      });
    }
  }, {
    key: 'findUserByFirstNameAndSecondName',
    value: async function findUserByFirstNameAndSecondName(name, surname) {
      return _bluebird2.default.all([_people2.default.find({ name: name, surname: surname }, excludeFields)]).spread(function (user) {
        return { user: user };
      });
    }
  }, {
    key: 'insertPerson',
    value: async function insertPerson(name, surname) {
      console.log("insertPerson");
      var people = new _people2.default();

      people.name = name;
      people.surname = surname;
      console.log("people: " + people);

      return _bluebird2.default.all([people.save()]).spread(function (success) {
        if (success) return 200;else return 404;
      });
    }
  }, {
    key: 'updatePerson',
    value: async function updatePerson(origName, origSurname, newName, newSurname) {
      console.log("updatePerson");
      var people = new _people2.default();

      return _bluebird2.default.all([_people2.default.update({ name: origName, surname: origSurname }, { name: newName, surname: newSurname }, { multi: true })], function (err) {
        if (!err) {
          console.log('numAffected');
          return "updated"; //next(numAffected);
        } else {
          console.log("err");
          return err;
        }
      });
    }
  }, {
    key: 'deletePerson',
    value: async function deletePerson(name, surname) {
      return _bluebird2.default.all([_people2.default.remove({ name: name, surname: surname }, function (err) {
        if (err) return handleError(err);else return 200;
      })]);
    }
  }]);

  return PeopleService;
}();

exports.default = PeopleService;