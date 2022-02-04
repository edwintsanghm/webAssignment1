/**
 * File name: routes/index.js
 * Student Name: Tsang Hiu Ming
 * Student ID: 301225087
 * Date: 2022-2-22
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var name = req.query.name;
  var email = req.query.email;
  var message = req.query.message;
  res.render('./pages/index', { title: 'Home Page', name: name, email: email, message: message});
});

router.get('/about', function(req, res, next) {
  res.render('./pages/about', { title: 'About Me' });
});

router.get('/projects', function(req, res, next) {
  res.render('./pages/projects', { title: 'Projects' });
});

router.get('/services', function(req, res, next) {
  res.render('./pages/services', { title: 'Services' });
});

router.get('/contact', function(req, res, next) {
  res.render('./pages/contact', { title: 'Contact Me' });
});

router.post("/contact/formSubmit",function(req,res){
  
  var name=req.body.name;
  var email=req.body.email;
  var message=req.body.message;

  console.log(name, email, message);

  res.redirect("/?name="+name+"&email="+email+"&message="+message);
});




module.exports = router;
