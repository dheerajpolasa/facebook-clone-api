const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use('/users', require('./users.js'))

module.exports = router;