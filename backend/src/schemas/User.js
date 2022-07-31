const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  username: String,
  email: String,
  phone: String,
  address: String,
  password: String,
});

module.exports = User;
