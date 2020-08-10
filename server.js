import "@babel/polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import peopleService from './services/peopleService';

let server;
let router = express.Router();
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
    let response = await peopleSrv.findAllUsers();
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/find/:name
 ************************************************************/
router.get('/find/:name', async function (req, res) {
  try {
    let response = await peopleSrv.findUserByFirstName(req.params.name);
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/find/:name/:surname
*********************************************************************/
router.get('/find/:name/:surname', async function (req, res) {
  try {
    let response = await peopleSrv.findUserByFirstNameAndSecondName(req.params.name, req.params.surname);
    res.json(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user
 ************************************************************/
router.post('/user/', async function (req, res) {
  try {
    let response = await peopleSrv.insertPerson(req.body.name, req.body.surname);
    res.sendStatus(response);
  } catch (err) {
    res.sendStatus(err);
  }
});

/* http://localhost:3000/People/api/user
 ***************************************************************************/
router.put('/user', async function (req, res) {
  try {
    if (req.body.origFirstname &&
      req.body.origSurname &&
      req.body.newName &&
      req.body.newSurname) {
        let response = await peopleSrv.updatePerson(req.body.origFirstname,
          req.body.origSurname,
          req.body.newName,
          req.body.newSurname);
        res.sendStatus(response);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    res.sendStatus(JSON.stringify(err));
  }
});

/* http://localhost:3000/People/api/user
 ***********************************************************************************/
router.delete('/user', async function (req, res) {
  try {
    if (req.body.name &&
        req.body.surname) {
        let response = await peopleSrv.deletePerson(req.body.name, req.body.surname);
        res.sendStatus(response);
    } else {
      res.sendStatus(500);
    }
  } catch(err) {
    res.sendStatus(JSON.stringify(err));
  }
});

if (!module.parent) {
  server = app.listen(port);
}

module.exports = {
  server: server,
  app: app
};