const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema);