const flash = require('koa-connect-flash')

exports.init = app => app.use(flash())
