'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _family = require('../models/family');

var _family2 = _interopRequireDefault(_family);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var connection = "saturday";
var url = "mongodb://127.0.0.1/sports";

//let f = new Family();
var excludeFields = '-_id -__v';

var People = function () {
  function People() {
    _classCallCheck(this, People);

    _bluebird2.default.promisifyAll(_mongoose2.default);
    _mongoose2.default.connect(url);

    _mongoose2.default.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + url);
    });

    // If the connection throws an error
    _mongoose2.default.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    _bluebird2.default.promisifyAll(_family2.default)(_mongoose2.default);
  }

  _createClass(People, [{
    key: 'findAllUsers',
    value: async function findAllUsers() {
      return _bluebird2.default.all([_family2.default.find({}, excludeFields)]).spread(function (user) {
        console.log("user: " + user);
        return { user: user };
      });
    }
  }, {
    key: 'findUserByFirstName',
    value: async function findUserByFirstName(name) {
      return _bluebird2.default.all([_family2.default.find({ name: name }, excludeFields)]).spread(function (user) {
        return { user: user };
      });
    }
  }, {
    key: 'findUserByFirstNameAndSecondName',
    value: async function findUserByFirstNameAndSecondName(name, surname) {
      return _bluebird2.default.all([_family2.default.find({ name: name, surname: surname }, excludeFields)]).spread(function (user) {
        return { user: user };
      });
    }
  }, {
    key: 'insertPerson',
    value: async function insertPerson(name, surname) {
      console.log("insertPerson");
      var family = new _family2.default();

      family.name = name;
      family.surname = surname;
      console.log("family: " + family);

      return _bluebird2.default.all([family.save()]).spread(function (success) {
        if (success) return 200;else return 404;
      });
    }
  }, {
    key: 'updatePerson',
    value: async function updatePerson(origName, origSurname, newName, newSurname) {
      console.log("updatePerson");
      var family = new _family2.default();

      return _bluebird2.default.all([_family2.default.update({ name: origName, surname: origSurname }, { name: newName, surname: newSurname }, { multi: true })], function (err) {
        if (!err) {
          console.log('numAffected');
          return "updated"; //next(numAffected);
        } else {
          console.log("err");
          return err;
        }
      });

      // return Promise.all([Family.update(
      //   { name: { $in: origName }, surname: { $in: origSurname } },
      //   { $set: { name: newName, surname: newSurname } },
      //   { multi: true }
      //   )], function(err, numAffected) {
      //   if (!err) {
      //     console.log(`numAffected`);
      //     return numAffected; //next(numAffected);
      //   }
      //   else {
      //     console.log("err");
      //     return err;
      //   }
      // });
    }
  }, {
    key: 'deletePerson',
    value: async function deletePerson(name, surname) {
      //return Promise.all([Family.remove(
      //{name: { $in: name } }
      //{ name: { name }}
      //)], function(err) {
      //if (err)
      //return 404;
      //else
      //return 204;
      //});

      return _bluebird2.default.all([_family2.default.remove({ name: name, surname: surname }, function (err) {
        if (err) return handleError(err);else return 200;
      })]);
    }
  }]);

  return People;
}();

exports.default = People;