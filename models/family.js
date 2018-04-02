import mongoose from 'mongoose';

let family;

class Family extends mongoose.Schema {

    constructor() {        
        super({
            name: String,
            surname: String
        },
        {
            collection: 'saturday'
        });
    }

}

export default mongoose.model('Family', new Family);