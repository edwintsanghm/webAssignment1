const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
  name: String,
  phone: String,
  emailAddress: String,
});

module.exports = mongoose.model('contact', Contact);