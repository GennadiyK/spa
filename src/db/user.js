const mongoose = require('./mongoose')

let userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)
