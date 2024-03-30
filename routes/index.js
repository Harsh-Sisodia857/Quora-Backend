const express = require('express');
const router = express.Router();

router.use('/user', require('./user.js'));
router.use('/question',require('./question.js'))

module.exports = router;