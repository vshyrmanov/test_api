const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    text: {type: String},
    bgColor: {type: String, default: '#fff'},
    textColor: {type: String, default: '#000'},
    widthSize: {type: Number, default: 400},
    heightSize: {type: Number, default: 250},
    owner: {type: Types.ObjectId, ref: 'Users'}
})

module.exports = model('Notes', schema)
