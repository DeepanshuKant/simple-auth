const express = require("express");
const Auth = require("../middlewares/Auth");

const notesRouter = express.Router();

const { createNote, getNotes } = require('../controllers/notesController')

notesRouter.post("/create", Auth, createNote);
notesRouter.get("/getNotes", Auth, getNotes);

module.exports = notesRouter;