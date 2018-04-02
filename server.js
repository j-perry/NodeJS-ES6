import express from 'express';
let router = express.Router();
import expressPromiseRouter from 'express-promise-router';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import peopleService from './services/people';

let server;
let app = express();

let peopleSrv = new peopleService();

Promise.promisifyAll(peopleSrv);

let port = process.env.PORT || (process.argv[2]) || 3000;
port = (typeof port === "number") ? port : 3000;
process.title = "NodeApp";

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
  type: "application/json"
}));
app.use(express.static('public'));

// public html files are separate from the APIs
app.use('/People/api', router);

console.log("Magic happens on port " + port);

router.route('/').get((req, res) => {
  res.json({
    message: 'hello!'
  });
});

/* http://localhost:3000/People/api/findAllUsers
 ************************************************************/
router.get('/findAllUsers', async function (req, res) {
  try {
    let test = { "name": "Jonathan" };
    let response = await peopleSrv.findAllUsers();
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/findUser/:name
 ************************************************************/
router.get('/findUser/:name', async function (req, res) {
  try {
    let response = await peopleSrv.findUserByFirstName(req.params.name);
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/findUser/:name/:surname
*********************************************************************/
router.get('/findUser/:name/:surname', async function (req, res) {
  try {
    let response = await peopleSrv.findUserByFirstNameAndSecondName(req.params.name, req.params.surname);
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user/create/:name/:surname
 ************************************************************/
router.post('/user/create/:name/:surname', async function (req, res) {
  try {
    let response = await peopleSrv.insertPerson(req.params.name, req.params.surname);
    res.sendStatus(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user/create
 ************************************************************/
router.post('/user/create', async function (req, res) {
  try {
    let response = await peopleSrv.insertPerson(req.body.name, req.body.surname);
    res.sendStatus(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user/update/
 ***************************************************************************/
router.put('/user/update', async function (req, res) {
  try {
    let response = await peopleSrv.updatePerson(req.body.origFirstname,
      req.body.origSurname,
      req.body.newName,
      req.body.newSurname);
    res.json(response);
  } catch (err) {
    res.err(err);
  }
});

/* http://localhost:3000/People/api/user/delete
 ***********************************************************************************/
router.delete('/user/delete', async function (req, res) {
  try {
    let response = await peopleSrv.deletePerson(req.body.name, req.body.surname);
    console.log("delete: " + response);
    res.json(response);
  } catch (err) {
    res.err(err);
  }
});

if (!module.parent) {
  server = app.listen(port);
}

module.exports = {
  server: server,
  app: app
};