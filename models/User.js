// Connect the user models with mongoose for interaction
const mongoose = require('mongoose');
// create a schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    avatar :{
        tyoe: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('user', UserSchema);