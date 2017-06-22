const session = require('koa-session-async')

exports.init = app => {
  app.keys = ['secret']
  app.use(session(app))
}
