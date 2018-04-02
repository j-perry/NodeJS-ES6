import Promise from 'bluebird';
import mongoose from 'mongoose';
import People from '../models/people';

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
    return Promise.all([People.find({}, excludeFields)]).spread(function(user) {
      console.log("user: " + user);
      return { user: user };
    });
  }

  async findUserByFirstName(name) {
    return Promise.all([People.find({name: name}, excludeFields)]).spread(function(user) {
      return { user: user };
    });
  }

  async findUserByFirstNameAndSecondName(name, surname) {
    return Promise.all([People.find({name: name, surname: surname}, excludeFields)]).spread(function(user) {
      return { user: user };
    });
  }

  async insertPerson(name, surname) {
    console.log("insertPerson");
    let people = new People();

    people.name = name;
    people.surname = surname;
    console.log("people: " + people);

    return Promise.all([people.save()]).spread(function(success) {
      if (success)
        return 200;
      else
        return 404;
    });
  }

  async updatePerson (origName, origSurname, newName, newSurname) {
    console.log("updatePerson");
    let people = new People();

    return Promise.all([People.update(
      { name: origName, surname: origSurname },
      { name: newName, surname: newSurname },
      { multi: true }
      )], function(err) {
        if (!err) {
          console.log(`numAffected`);
          return "updated"; //next(numAffected);
        }
        else {
          console.log("err");
          return err;
        }
    });
  }

  async deletePerson(name, surname) {
    return Promise.all([People.remove({ name: name, surname: surname }, function(err) {
      if (err)
        return handleError(err);
      else
        return 200;
    })]);
  }

}