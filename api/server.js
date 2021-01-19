const express = require('express');
const logger = require('morgan');

const quotes = require('./routes/quotes');
const users = require('./routes/users');
const validate = require('./util/validation');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/database'); //database configuration

const app = express();
require('dotenv').config()

app.set('secretKey', process.env.JWT_KEY);

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
mongoose.connection.once("open", () => console.log("Connected To Database"));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// public route
app.use('/users', users.router);


// private route
app.use('/users', validate.validateUser, validate.validateAdmin, users.createRouter)
app.use('/quotes', validate.validateUser, quotes);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong!" });
});

app.listen(8000, function () {
    console.log('Node server listening on port 8000');
});