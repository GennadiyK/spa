const router = require('koa-router')()
var views = require('koa-views')

module.exports = function(app) {
  app.use(views(`views`, { extension: 'ejs' }))

  router.get('/todo', async (ctx) => {
    await ctx.render('todo')
  })

  router.post('/todo', (ctx) => {
    console.log('post')
  })


  router.delete('/todo', (ctx) => {
    console.log('delete')
  })



  app.use(router.routes());
}



