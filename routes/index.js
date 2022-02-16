/**
 * File name: routes/index.js
 * Student Name: Tsang Hiu Ming
 * Student ID: 301225087
 * Date: 2022-2-22
 */

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const model = require('./model');


// const isLoggedIn = (req, res, next) => {
//   if(req.cookies.jwt) {
//     jwt.verify(req.cookies.jwt, 'Edwinsecret', async function(err, decoded) {
//       const user = await model.users.findById(decoded.id);

//       if(user)
//         req.isLoggedIn = true;
//       else 
//         req.isLoggedIn = false;
//     })
//   }
//   next();
// }
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.isLoggedIn, '99')
  var name = req.query.name;
  var email = req.query.email;
  var message = req.query.message;
  res.render('./pages/index', { title: 'Home Page', name: name, email: email, message: message});
});

router.get('/about', function(req, res, next) {
  console.log('req', req.isLoggedIn);
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

  res.redirect("/?name="+name+"&email="+email+"&message="+message);
});

router.get("/login",function(req,res,next){
  res.render('./pages/login', { title: 'User Login' });
});

// router.post("/login", function(req,res ){

//   var username=req.body.username;
//   var password=req.body.password;
  
//   model.users.find({ username: username, password: password }, function (err, docs) {
//     if(docs[0] != null) {
//       res.redirect('/businessContacts');
//     } else {
//       res.render('./pages/login', { title: 'User Login', message: 'Login Failed' });
//     }
//   });
// });

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'Edwinsecret', {
    expiresIn: maxAge
  });
};

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await model.users.login(username, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(200).json({ user: user._id });
    res.redirect('/businessContacts');
  } 
  catch (err) {
    // const errors = handleErrors(err);
    console.log(err)
    // res.status(400).json({ errors });
    res.render('./pages/login', { title: 'User Login', message: 'Login Failed' });

  }

});




module.exports = router;
