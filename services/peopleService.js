import Promise from 'bluebird';
import mongoose from 'mongoose';
import People from '../models/people';
import { setTimeout } from 'timers';

let url = "mongodb://127.0.0.1/saturday";

const excludeFields = '-_id -__v';

export default class PeopleService {

  constructor() {
    Promise.promisifyAll(mongoose);
    mongoose.connect(url);

    mongoose.connection.on('connected', () => {  
      console.log('Mongoose default connection open to ' + url);
    });
    
    // if the connection throws an error
    mongoose.connection.on('error', (err) => {  
      console.log('Mongoose default connection error: ' + err);
    });

    Promise.promisifyAll(People)(mongoose);
  }

  async findAllUsers() {
    return People.find({}, excludeFields).then(function(user) {
      return { user: user };
    }).catch(function(err) {
      return err;
    });
  }

  async findUserByFirstName(name) {
    return People.find({name: name}, excludeFields).then(function(user) {
      return { user: user };
    }).catch(function(err) {
      return err;
    });
  }

  async findUserByFirstNameAndSecondName(name, surname) {
    return People.find({ name: name, surname: surname }, excludeFields).then(function(user) {
      return { user: user };
    }).catch(function(err) {
      return err;
    });
  }

  async insertPerson(name, surname) {
    console.log("insertPerson");
    let people = new People();

    people.name = name;
    people.surname = surname;
    console.log("people: " + people);

    return people.save().then(function(err, people) {
      return 200;
    }).catch(function(err) {
      return 404;
    });
  }

  async updatePerson (origName, origSurname, newName, newSurname) {
    console.log("updatePerson");
    let people = new People();
    const objToUpdate = {};

    if (newName)
      objToUpdate.newName = newName;
    if (newSurname)
      objToUpdate.newSurname = newSurname;

    console.log(`origName ${origName}`);
    console.log(`origSurname ${origSurname}`);
    console.log(`newName ${newName}`);
    console.log(`newSurname ${newSurname}`);

    const setObj = objToUpdate;

    return People.update(
      { name: origName, surname: origSurname },
      { name: newName, surname: newSurname },
      { multi: true }).then(function(err, page) {
        return 200;
      }).catch(function(e) {
        return 404;
      });
  }

  async deletePerson(name, surname) {
    return People.remove({ name: name, surname: surname }).then(function(err, user) {
      return 200;
    }).catch(function(e) {
      return 404;
    });
  }

}