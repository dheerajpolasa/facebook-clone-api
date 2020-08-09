const mongoose = require('mongoose');

// Connect to DB
mongoose.connect('mongodb://localhost/facebook_clone');

// acquire the connection
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error connecting to DB'));

// up and running
db.once('open', function() {
    console.log('Successfully connected to the database');
})

module.exports = db;