const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    url: {
        type: String,
        // validate:{
        //     validator: (url) => {
                
        //     },
        //     message: 'Name must be longer than 2 characters.'
        // },
        required: true,
    },
    method: {
        type: Object,
        required: true,
    },
    data: {
        type: Object
    },
    headers: {
        type: Object
    },
    responses:{
        type:Array
    }

},{ minimize: false })

urlSchema.set('toJSON', { virtuals: true });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
