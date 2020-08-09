const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.post('/register', usersController.create)
router.post('/delete', usersController.delete)

module.exports = router