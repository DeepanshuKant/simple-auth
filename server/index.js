const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const usersRoute = require("./routes/usersRoute");
const notesRoutes = require("./routes/notesRoute")



const app = express();

//MongoD connect here
mongoose.connect("mongodb://localhost:27017/SimpleAuth", { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => console.log('MongoDB Connected...')).
    catch(err => console.log(err));


//Middlewares are used here
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

//Routes are used here
app.use("/users", usersRoute);
app.use("/notes", notesRoutes)


app.listen(4000, () => {
    console.log('Server is running on port 4000')
})