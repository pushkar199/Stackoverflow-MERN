const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    name:String,
    about: { type: String },
    tags: { type: [String] },
    joinedOn: { type: Date, default: Date.now },
})


module.exports = mongoose.model('user', userSchema, 'users');