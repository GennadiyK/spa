const passport = require('../lib/passport')
exports.init = app => app.use(passport.session())
