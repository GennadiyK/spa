const router = require('koa-router')()
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
let data = [{task: 'get milk'},{task: 'walk dog8'}, {task: 'some coding'}]

module.exports = function(app) {
  app.use(views(`views`, { extension: 'ejs' }))

  router.get('/todo', async (ctx) => {
    ctx.status = 200
    await ctx.render('todo', {todos: data})
  })

  router.post('/todo', async (ctx) => {
    data.push(ctx.request.body)
    // await ctx.render('todo', {todos: data})
    ctx.status = 201
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = data
  })

  router.delete('/todo', (ctx) => {
    console.log('delete')
  })

  app.use(bodyParser());
  app.use(router.routes());
}



