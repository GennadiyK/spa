const passport = require('koa-passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../../db/user')

passport.use('facebook', new FacebookStrategy({
  clientID: '234685973706060',
  clientSecret: '1fb283db25e0c48f3ea6d178bc2e414b',
  callbackURL: 'http://localhost:3000/login/facebook/callback'
},
async (token, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({'facebook.id': profile.id})
    if (user) {
      return done(null, user)
    } else {
      let newUser = new User()
      newUser.facebook.id = profile.id
      newUser.facebook.token = token
      newUser.facebook.name = profile.displayName || null
      newUser.facebook.email = null
      newUser.save((err) => {
        if (err) {
          throw err
        }
        return done(null, newUser)
      })
    }
  } catch (err) {
    return done(err)
  }
}
))
