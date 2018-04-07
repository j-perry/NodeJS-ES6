import mongoose from 'mongoose';

class People extends mongoose.Schema {

    constructor() {        
        super({
            name: {
                type: String,
                required: true
            },
            surname: {
                type: String,
                required: true
            }
        },
        {
            collection: 'es6'
        });
    }

}

export default mongoose.model('People', new People);