const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use('/users', require('./users.js'))
router.use('/api/v1', require('./api/v1'));

module.exports = router;