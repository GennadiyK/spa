let Csrf = require('koa-csrf')

exports.init = (app) => {
  app.use(new Csrf({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: false
  }))

  app.use(async (ctx, next) => {
    if (!['GET', 'POST'].includes(ctx.method)) {
      return next()
    }
    await next()
  })
}
