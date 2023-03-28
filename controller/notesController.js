const Note = require('../models/note')

const fetchNotes = async (req, res) => {
    try {
        //find all notes
        const notes = await Note.find({user: req.user._id});
        //Responds to the notes
        res.json({ notes });


    } catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
    
}

const fetchNote = async (req, res) => {
    try{
        //get the dynamic url id
        const noteId = req.params.id;
        //find the notes using that id
        const note = await Note.findOne({_id : noteId , user: req.user._id});
        //respond with it
        res.json({ note });
    }catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
}

const createNote = async (req, res) => {
    try{
        //Get the sent in data off request body
        const {title, body} = req.body;

        //Create a note with it
        const note = await Note.create({
            title,
            body,
            user : req.user._id
        })

        //respond
        res.json({note});
    }catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
}

const updateNote = async (req, res) => {
    try{
        //Get the id of the note
        const noteId = req.params.id;

        //Get the title and body of note
        const {title, body} = req.body;
    
        //find and update the note by id
        await Note.findOneAndUpdate( {_id :noteId , user: req.user._id} , {
            title,
            body
        })
        //find the updated note
        const note = await Note.findById(noteId)

        //respond with it
        res.json(note)
    }catch (err) {
        res.sendStatus(500);
        console.log("Server Error");
    }
}

const deleteNote = async (req, res) => {
    try{
        //Get the id of note
        const noteId = req.params.id;

        //Delete the note using the id
        const note = await Note.deleteOne({_id: noteId , user : req.user._id});
        //Respond by the delete note
        res.json({note}); 

    }catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
}


module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}