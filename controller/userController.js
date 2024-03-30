const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const jwtSecret = process.env.JWT_SECRET;

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const createUser = async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10)
    const images = req.file?.images;
    let imageUrl;
    if (images) {
        const response = await uploadFileToCloudinary(images[i], `-${req.body.name}`);
        console.log(`Uploaded image ${i + 1}: ${response.secure_url}`);
        imageUrl = response.secure_url;
    }

    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            profileImage: imageUrl    
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        }).catch(err => {
                console.log(err);
                res.json({
                    error: "Please enter a unique value.",
                    message: err
                })
            })
    } catch (error) {
        console.error(error.message)
    }
};

const loginUser = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        const userData = {
            id: user.id,
            name: user.name
        }
        res.json({ success, authToken, userData })
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
};

// Function to get user details
const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
};

module.exports = {
    createUser,
    loginUser,
    getUser
};