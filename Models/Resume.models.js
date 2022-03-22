const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String},
    owner: {type: Types.ObjectId, ref: 'Users'}
})

module.exports = model('Resume', schema)