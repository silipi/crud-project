const mongoose = require('mongoose');

const Client = mongoose.model('Client', {
  name: String,
  email: String,
  phone: String,
  address: String,
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // ref: 'Pet',
    },
  ],
});

module.exports = Client;
