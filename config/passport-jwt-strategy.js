require("dotenv/config");
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// Set the options for configuring the JWT
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

// Extract the user id from payload and verify it is actually present in "database"
passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user) {
        // 1. Check if the user is present in "database"
        if (err) {
            console.log('Error in finding user from JWT', err);
            return;
        }

        // 2. If the user is present in "database" return true
        if (user) {
            return done(null, user);
        } else {
            // 3. If not return "false"
            return done(null, false);
        }

    })
}))

module.exports = passport;