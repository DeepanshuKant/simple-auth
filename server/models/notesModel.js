const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    },
    { timestamps: true }
)

const notesModel = mongoose.model("notes", noteSchema);
module.exports = notesModel;