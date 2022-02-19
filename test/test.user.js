var should = require("should");
var mongoose = require('mongoose');
var User = require('../models/user');
var db;

describe('User', function() {
const uri = "mongodb+srv://edwintsang:62800024@cluster0.v02we.mongodb.net/database?retryWrites=true&w=majority";

before(function(done) {
 db = mongoose.connect(uri);
   done();
 });

 after(function(done) {
   mongoose.connection.close()
   done();
 });

 beforeEach(function(done) {
  var user = new User({
    username: 'et',
    password: 'testy',
    emailAddress: 'abc@gmail.com'
  });

  user.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
 });

 var id = "";
 it('find a user by username', function(done) {
    User.findOne({ username: 'et' }, function(err, user) {
      user.username.should.eql('et');
      console.log("username: ", user.username)
      id=user._id;
      done();
    });
 });

 afterEach(function(done) {
    User.findByIdAndRemove(id, function() {
      done();
    });
 });

});