const express = require('express');
const usersApi = require('../../../controllers/api/v1/users_api');
const router = express.Router();

// Router for creating a new user profile
router.post('/register', usersApi.create);

// Route for deleting the existing user profile
router.post('/delete', usersApi.delete);

// Route for creating user session
router.post('/create-session', usersApi.createSession);

module.exports = router;