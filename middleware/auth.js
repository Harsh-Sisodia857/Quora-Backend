const dotenv = require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const jwtSecret = process.env.JWT_SECRET


exports.authenticated = async (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Auth Token is Invalid" })
    }
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = await User.findById(data.user.id);
        next();

    } catch (error) {
        console.log("ERROR : ", error)
        res.status(401).send({ error: "Invalid Auth Token" })
    }

}