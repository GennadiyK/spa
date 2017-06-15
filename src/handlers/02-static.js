const serve = require('koa-static')

exports.init = app => {
  app.use(serve('./src/assert/css'))
  app.use(serve('./src/assert/img'))
}
