require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const mongoose = require('mongoose');
const db = require('./config/mongoose')

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log(`Server listening on Port ${process.env.PORT}`);
});