const mongoose = require('mongoose');

const demoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name'
  },
  address: {
    type: String,
    required: 'You must supply an address!'
  },
  description: {
    type: String,
    required: 'You must supply a description!'
  },
  website: {
    type: String,
    required: 'You must supply a website!'
  },
  email: {
    type: String,
    trim: true,
    required: 'You must supply an email!'
  },
  phone: {
    type: String,
    required: 'You must supply a phone number!'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Demo', demoSchema);
