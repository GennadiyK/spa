const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

exports.init = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy((username, passport, done) => {

  }))
}
