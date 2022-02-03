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
  res.render('./pages/index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('./pages/about', { title: 'About Me' });
});

router.get('/projects', function(req, res, next) {
  res.render('./pages/projects', { title: 'About Me' });
});

router.get('/services', function(req, res, next) {
  res.render('./pages/services', { title: 'About Me' });
});

router.get('/contact', function(req, res, next) {
  res.render('./pages/contact', { title: 'About Me' });
});

router.get('/users', function(req, res, next) {
  res.render('./pages/users', { title: 'About Me' });
});



module.exports = router;