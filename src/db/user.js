const mongoose = require('./mongoose')
const bcrypt = require('bcryptjs')

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  }
})

UserSchema.methods.generateHash = (passport) => {
  return bcrypt.hashSync(passport, bcrypt.genSaltSync(8), null)
}

module.exports = mongoose.model('User', UserSchema)
