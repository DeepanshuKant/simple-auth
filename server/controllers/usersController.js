const usersModel = require('../models/usersModel.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        //check if user exists
        const existingUser = await usersModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })//400 means bad request
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newDetails = {
            username: username,
            email: email,
            password: hashedPassword
        }

        //creating new user
        const newUserCreated = await usersModel.create(newDetails)

        //Sign the token
        const token = jwt.sign({ email: newUserCreated.email, id: newUserCreated._id }, "test");

        return res.status(200).cookie("token", token).json({ user: newUserCreated, token });


    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: "Something went wrong" });//500 means internal server error
    }
}

const signin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the fields" });//400 means bad request
        }

        //check if user exists or not
        const existingUser = await usersModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });//404 means not found
        }

        //check if password is correct or not
        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //Sign the token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test");

        return res.status(200).cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({ result: existingUser, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}



const getUser = async (req, res) => {


    try {
        const user = await usersModel.findOne({ _id: req.userId });

        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        return res.status(200).json({ success: true, user: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}


module.exports = { signup, signin, getUser }