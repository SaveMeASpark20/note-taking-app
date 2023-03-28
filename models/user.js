const mongoose = require('mongoose');

//schema defining structure of database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,

    },
    Note : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
})

//providing an interface to the database
const User = mongoose.model('User', userSchema)

module.exports = User;
