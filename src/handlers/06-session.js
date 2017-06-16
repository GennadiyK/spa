const session = require('koa-session-async')

exports.init = app => app.use(session({secret: 'this is the secret'}))
