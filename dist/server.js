'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _peopleService = require('./services/peopleService');

var _peopleService2 = _interopRequireDefault(_peopleService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


var server = void 0;
var app = (0, _express2.default)();

var peopleSrv = new _peopleService2.default();

_bluebird2.default.promisifyAll(peopleSrv);

var port = process.env.PORT || process.argv[2] || 3000;
port = typeof port === "number" ? port : 3000;
process.title = "NodeApp";

app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use(_bodyParser2.default.json({
  type: "application/json"
}));
app.use(_express2.default.static('public'));

// public html files are separate from the APIs
app.use('/People/api', router);

console.log("Magic happens on port " + port);

router.route('/').get(function (req, res) {
  res.json({
    message: 'hello!'
  });
});

/* http://localhost:3000/People/api/findAllUsers
 ************************************************************/
router.get('/findAllUsers', async function (req, res) {
  try {
    var test = { "name": "Jonathan" };
    var response = await peopleSrv.findAllUsers();
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/findUser/:name
 ************************************************************/
router.get('/findUser/:name', async function (req, res) {
  try {
    var response = await peopleSrv.findUserByFirstName(req.params.name);
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/findUser/:name/:surname
*********************************************************************/
router.get('/findUser/:name/:surname', async function (req, res) {
  try {
    var response = await peopleSrv.findUserByFirstNameAndSecondName(req.params.name, req.params.surname);
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user/create/:name/:surname
 ************************************************************/
router.post('/user/create/:name/:surname', async function (req, res) {
  try {
    var response = await peopleSrv.insertPerson(req.params.name, req.params.surname);
    res.sendStatus(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user/create
 ************************************************************/
router.post('/user/create', async function (req, res) {
  try {
    var response = await peopleSrv.insertPerson(req.body.name, req.body.surname);
    res.sendStatus(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user/update
 ***************************************************************************/
router.put('/user/update', async function (req, res) {
  if (req.body.origFirstname && req.body.origSurname && req.body.newName && req.body.newSurname) {
    var response = await peopleSrv.updatePerson(req.body.origFirstname, req.body.origSurname, req.body.newName, req.body.newSurname);
    console.log("/update" + JSON.stringify(response));
    res.sendStatus(response);
  } else {
    res.sendStatus(500);
  }

  // try {
  //   let response = await peopleSrv.updatePerson(req.body.origFirstname,
  //     req.body.origSurname,
  //     req.body.newName,
  //     req.body.newSurname);
  //     console.log("/update" + JSON.stringify(response));
  //   res.sendStatus(response);
  // } catch (err) {
  //   res.sendStatus(JSON.stringify(err));
  // }
});

/* http://localhost:3000/People/api/user/delete
 ***********************************************************************************/
router.delete('/user/delete', async function (req, res) {
  //try {
  if (req.body.name && req.body.surname) {
    var response = await peopleSrv.deletePerson(req.body.name, req.body.surname);
    console.log("delete: " + response);
    res.sendStatus(response);
  } else {
    res.sendStatus(500);
  }
});

if (!module.parent) {
  server = app.listen(port);
}

module.exports = {
  server: server,
  app: app
};