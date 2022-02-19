/**
 * File name: app.js
 * Student Name: Tsang Hiu Ming
 * Student ID: 301225087
 * Date: 2022-2-22
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"Edwin", resave: true, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

var router = require('./routes');
var bcvRouter = require('./routes/businessContacts');

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const uri = "mongodb+srv://edwintsang:62800024@cluster0.v02we.mongodb.net/database?retryWrites=true&w=majority";

// mongoose
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true});

app.use(router);

app.use('/businessContacts', bcvRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./pages/error');
});

module.exports = app;
