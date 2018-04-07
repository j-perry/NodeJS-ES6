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
    return People.find({}, excludeFields).then((user) => {
      return { user: user };
    }).catch(function(err) {
      return err;
    });
  }

  async findUserByFirstName(name) {
    return People.find({name: name}, excludeFields).then((user) => {
      return { user: user };
    }).catch(function(err) {
      return err;
    });
  }

  async findUserByFirstNameAndSecondName(name, surname) {
    return People.find({ name: name, surname: surname }, excludeFields).then((user) => {
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

    return people.save().then((err, people) => {
      return 200;
    }).catch((err) => {
      return 404;
    });
  }

  async updatePerson (origName, origSurname, newName, newSurname) {
    console.log("updatePerson");

    return People.update(
      { name: origName, surname: origSurname },
      { name: newName, surname: newSurname },
      { multi: true }).then((err, page) => {
        return 200;
      }).catch((e) => {
        return 404;
      });
  }

  async deletePerson(name, surname) {
    return People.remove({ name: name, surname: surname }).then((err, user) => {
      return 200;
    }).catch((e) => {
      return 404;
    });
  }

}