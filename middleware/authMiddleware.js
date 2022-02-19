const jwt = require('jsonwebtoken');

const needAuthenticated = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if(isAuthenticated) {
    req.isLoggedIn = true;
    next();
  } else {
    req.isLoggedIn = false;
    res.redirect('/login');
  }
};


const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'Edwinsecret', (err, decodedToken) => {
        if (err) {
          req.isLoggedIn = false;
        } else {
          req.isLoggedIn = true;
        }
      });
    } else {
      req.isLoggedIn = false;
    }
    next();
}

module.exports = { needAuthenticated, isLoggedIn };