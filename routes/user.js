const express = require('express');
const { body } = require('express-validator');
const { authenticated } = require('../middleware/auth');
const { loginUser, createUser, getUser } = require('../controller/userController');

const router = express.Router();

router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], createUser);

router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], loginUser);

router.get('/getuser', authenticated, getUser);

router.post('/logout', (req, res) => {
    res.setHeader('auth-token', '');
    res.json({ success: true, message: 'Logout successful' });
});

module.exports = router;