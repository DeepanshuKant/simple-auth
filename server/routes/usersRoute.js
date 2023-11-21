const express = require('express')

const usersRoute = express.Router();
const { signup, signin, getUser } = require('../controllers/usersController.js')


const Auth = require("../middlewares/Auth");

usersRoute.post('/signup', signup);
usersRoute.post("/signin", signin);
usersRoute.get("/me", Auth, getUser);

module.exports = usersRoute;