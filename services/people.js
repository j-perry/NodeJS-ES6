import Promise from 'bluebird';
import mongoose from 'mongoose';
import Family from '../models/family';

let connection = "saturday";
let url = "mongodb://127.0.0.1/sports";

const excludeFields = '-_id -__v';

export default class People {

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

    Promise.promisifyAll(Family)(mongoose);
  }

  async findAllUsers() {
    return Promise.all([Family.find({}, excludeFields)]).spread(function(user) {
      console.log("user: " + user);
      return { user: user };
    });
  }

  async findUserByFirstName(name) {
    return Promise.all([Family.find({name: name}, excludeFields)]).spread(function(user) {
      return { user: user };
    });
  }

  async findUserByFirstNameAndSecondName(name, surname) {
    return Promise.all([Family.find({name: name, surname: surname}, excludeFields)]).spread(function(user) {
      return { user: user };
    });
  }

  async insertPerson(name, surname) {
    console.log("insertPerson");
    let family = new Family();

    family.name = name;
    family.surname = surname;
    console.log("family: " + family);

    return Promise.all([family.save()]).spread(function(success) {
      if (success)
        return 200;
      else
        return 404;
    });
  }

  async updatePerson (origName, origSurname, newName, newSurname) {
    console.log("updatePerson");
    let family = new Family();

    return Promise.all([Family.update(
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
    return Promise.all([Family.remove({ name: name, surname: surname }, function(err) {
      if (err)
        return handleError(err);
      else
        return 200;
    })]);
  }

}