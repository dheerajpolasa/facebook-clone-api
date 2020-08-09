const { hash, compare } = require("bcryptjs");

const User = require('../models/user');

module.exports.create = async function (req, res) {
    const { email, password } = req.body;
    try {

        const hashedPassword = await hash(password, 10);

        console.log('Hashed Password ', hashedPassword)

        return res.json(201, {
            message: 'User profile is created'
        })
    } catch (err) {
        console.log('Error in creating the user profile ', err)
    }
}