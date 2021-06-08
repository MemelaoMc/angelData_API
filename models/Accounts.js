const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password_1: {
    type: String,
    required: true,
    minlength: 4,
  },
  password_2: {
    type: String,
    required: true,
    minlength: 4
  },
  responsable: {
    type: String,
    required: true,
    minlength: 4
  },
  responsable_email: {
    type: String,
    required: true,
    minlength: 4
  },
  progress: {
    type: String,
    required: true,
    min: 1
  },
  comment: {
    type: String,
    min: 4
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Accounts', accountSchema);