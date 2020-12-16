const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const MONGODB_URI = process.env.DB_URL;
const logger = require('morgan');
const cors = require("cors");
require("dotenv").config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send({ message: 'error' });
});


// begin using Mongoose
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(self => {
        console.log(`Connected to the database: "${self.connection.name}"`);
    })
    .catch(err => {
        console.log("err", err);
    });



module.exports = app;



