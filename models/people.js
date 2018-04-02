import mongoose from 'mongoose';

//let family;

class People extends mongoose.Schema {

    constructor() {        
        super({
            name: String,
            surname: String
        },
        {
            collection: 'es6'
        });
    }

}

export default mongoose.model('People', new People);