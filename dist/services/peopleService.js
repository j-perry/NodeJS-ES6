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

var _timers = require('timers');

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
      return _people2.default.find({}, excludeFields).then(function (user) {
        return { user: user };
      }).catch(function (err) {
        return err;
      });
    }
  }, {
    key: 'findUserByFirstName',
    value: async function findUserByFirstName(name) {
      return _people2.default.find({ name: name }, excludeFields).then(function (user) {
        return { user: user };
      }).catch(function (err) {
        return err;
      });
    }
  }, {
    key: 'findUserByFirstNameAndSecondName',
    value: async function findUserByFirstNameAndSecondName(name, surname) {
      return _people2.default.find({ name: name, surname: surname }, excludeFields).then(function (user) {
        return { user: user };
      }).catch(function (err) {
        return err;
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

      return people.save().then(function (err, people) {
        return 200;
      }).catch(function (err) {
        return 404;
      });
    }
  }, {
    key: 'updatePerson',
    value: async function updatePerson(origName, origSurname, newName, newSurname) {
      console.log("updatePerson");
      var people = new _people2.default();
      var objToUpdate = {};

      if (newName) objToUpdate.newName = newName;
      if (newSurname) objToUpdate.newSurname = newSurname;

      console.log('origName ' + origName);
      console.log('origSurname ' + origSurname);
      console.log('newName ' + newName);
      console.log('newSurname ' + newSurname);

      var setObj = objToUpdate;

      return _people2.default.update({ name: origName, surname: origSurname }, { name: newName, surname: newSurname }, { multi: true }).then(function (err, page) {
        return 200;
      }).catch(function (e) {
        return 404;
      });
    }
  }, {
    key: 'deletePerson',
    value: async function deletePerson(name, surname) {
      return _people2.default.remove({ name: name, surname: surname }).then(function (err, user) {
        return 200;
      }).catch(function (e) {
        return 404;
      });
    }
  }]);

  return PeopleService;
}();

exports.default = PeopleService;