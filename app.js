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
const { requireAuth } = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const model = require('./routes/model');

var router = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const isLoggedIn = (req, res, next) => {
  if(req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, 'Edwinsecret', async function(err, decoded) {
      const user = await model.users.findById(decoded.id);
      if(user)
        req.isLoggedIn = true;
      else 
        req.isLoggedIn = false;
    })
  }else {
    req.isLoggedIn = false;
  }
  return next();
}
app.use(isLoggedIn)
// router
app.use('/', router);
app.get('/businessContacts', requireAuth, (req, res) => res.render('./pages/businessContacts', { title: 'Business Contacts' })
);

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
