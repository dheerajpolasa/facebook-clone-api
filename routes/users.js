const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.post('/register', usersController.create)

module.exports = router