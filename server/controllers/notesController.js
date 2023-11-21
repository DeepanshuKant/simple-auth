const notesModel = require('../models/notesModel')


const createNote = async (req, res) => {

    console.log(req.userId)

    const details = {
        title: req.body.title,
        description: req.body.description,
        userId: req.userId
    }

    // console.log(details)

    try {
        const newNote = await notesModel.create(details);

        if (newNote) {
            return res.status(200).json({ message: "Note created successfully" })
        }
        else {
            return res.status(500).json({ message: "Something went wrong" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }

}


const getNotes = async (req, res) => {

    const allNotes = await notesModel.find({ userId: req.userId });

    if (allNotes.length === 0) {
        return res.status(200).json({ message: "No notes found" })
    }
    else {
        return res.status(200).json({ notes: allNotes })
    }

}

module.exports = { createNote, getNotes }