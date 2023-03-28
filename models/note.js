const mongoose = require('mongoose');

//schema defining structure of database
const noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

//providing an interface to the database
const Note = mongoose.model('note', noteSchema)

module.exports = Note;
