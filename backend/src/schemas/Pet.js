const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', {
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  client: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Client',
    type: String,
    required: true,
  },
});

module.exports = Pet;
