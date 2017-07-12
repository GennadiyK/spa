const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
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

passport.use('facebook', new FacebookStrategy({
  clientID: '234685973706060',
  clientSecret: '1fb283db25e0c48f3ea6d178bc2e414b',
  callbackURL: 'http://localhost:3000/login/facebook/callback'
},
function (token, refreshToken, profile, done) {
  console.log(profile.id)

  User.findOne({'facebook.id': profile.id}, (err, user) => {
    if (err) {
      return done(err)
    }

    if (user) {
      return done(null, user)
    } else {
      let newUser = new User()
      newUser.facebook.id = profile.id
      newUser.facebook.token = token
      newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName
      newUser.facebook.email = profile.emails[0].value
      newUser.save((err) => {
        if (err) {
          throw err
        }
        return done(null, newUser)
      })
    }
  })
}
))
