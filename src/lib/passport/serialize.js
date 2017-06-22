const User = require('../../db/user')
const passport = require('koa-passport')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})
