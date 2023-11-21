const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {

    const token = req.cookies.token;

    try {
        if (token) {
            const user = jwt.verify(token, "test");
            req.userId = user.id;
        }
        else {
            return res.status(401).json({ message: "Unauthorized User" })//401 means unauthorized
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized User" })//401 means unauthorized
    }
    next();
}

module.exports = Auth;