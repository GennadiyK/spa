const views = require('koa-views')

exports.init = app => {
  app.use(views(`src/views`, { extension: 'ejs' }))
  app.use(async (ctx, next) => {
    try {
      await next()
      const status = ctx.status || 404
      if (status === 404) {
        ctx.throw(404)
      }
    } catch (e) {
      if (e.status) {
        ctx.status = e.status
        await ctx.render('error', {message: e.message})
      } else {
        ctx.body = 'Error 500'
        ctx.status = 500
        console.error(e.message, e.stack)
      }
    }
  })
}
