/**
 * File name: routes/index.js
 * Student Name: Tsang Hiu Ming
 * Student ID: 301225087
 * Date: 2022-2-22
 */

var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
const User = require('../models/user');

router.get('/', function(req, res, next) {
  var name = req.query.name;
  var email = req.query.email;
  var message = req.query.message;
  res.render('./pages/index', { title: 'Home Page', name: name, email: email, message: message, isLoggedIn: req.isAuthenticated()});
});

router.get('/about', function(req, res, next) {
  res.render('./pages/about', { title: 'About Me' , isLoggedIn: req.isAuthenticated()});
});

router.get('/projects',   function(req, res, next) {
  res.render('./pages/projects', { title: 'Projects', isLoggedIn: req.isAuthenticated() });
});

router.get('/services',   function(req, res, next) {
  res.render('./pages/services', { title: 'Services', isLoggedIn: req.isAuthenticated() });
});

router.get('/contact',   function(req, res, next) {
  res.render('./pages/contact', { title: 'Contact Me', isLoggedIn: req.isAuthenticated() });
});

router.post("/contact/formSubmit", function(req,res){
  
  var name=req.body.name;
  var email=req.body.email;
  var message=req.body.message;

  res.redirect("/?name="+name+"&email="+email+"&message="+message);
});

router.get("/login", function(req,res,next){
  res.render('./pages/login', { title: 'User Login', isLoggedIn: false  });
});

router.post("/login", passport.authenticate('local',{ failureRedirect: '/login' }), async (req, res) => {
  res.redirect('/businessContacts');
});

router.get('/register', function(req, res) {
  res.render('./pages/register', {title: 'Register', isLoggedIn: false });
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username, emailAddress: req.body.email}), req.body.password, function(err, user) {
    if (err) {
        return res.render('register', {title: 'Register' ,info: "Sorry. That username already exists. Try again.", isLoggedIn: false});
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
