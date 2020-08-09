require('dotenv/config')
const { hash, compare } = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const { json } = require("express");

// To create user profile
module.exports.create = async function (req, res) {
    const { email, password, name } = req.body;
    try {
        // 1. Find if user is already exists in db
        const user = await User.findOne({email: email});
        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(password, 10);
        await User.create({
            email: email,
            password: hashedPassword,
            name: name
        })

        return res.json(201, {
            message: 'User profile is created'
        })

    } catch (err) {
        console.log('Error in creating the user profile ', err)
        return res.json(400, {
            message: `${err.message}`
        })
    }
}

// To delete the user profile
module.exports.delete = async function(req, res) {
    const { email } = req.body;
    try {
        console.log(email)
        const user = await User.findOne({email: email});
        console.log(user);
        if(user) {
            await User.deleteOne({email: email});
        } else {
            throw new Error('User profile not found')
        }

        return res.json(201, {
            message: 'User profile deleted'
        })
        
    } catch (err) {
        console.log('Error in deleting the user profile', err);
        return res.json(400, {
            message: `${err.message}`
        })
    }
}

// To create user session and return json web token
module.exports.createSession = async function(req, res) {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('Username/Password is wrong');
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error('Username/Password is wrong');
        } else {
            return res.json(201, {
                message: 'Sign in successful. Here is your token, keep it safe',
                data: {
                    token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {expiresIn: '10000'})
                }
            })
        }
    } catch (err) {
        return res.json(400, {
            message: `${err.message}`
        })
    }
}