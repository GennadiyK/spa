const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../db/user')

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user found.'))
    }

    if (!user.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops ! Wrong password.'))
    }

    return done(null, user)
  })
}))
