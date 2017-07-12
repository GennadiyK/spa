const mongoose = require('./mongoose')
const bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  facebook: {
    id: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    }
  }
})

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
