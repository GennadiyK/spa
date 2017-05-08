const router = require('koa-router')()
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
// let data = [{task: 'get milk'},{task: 'walk dog8'}, {task: 'some coding'}]
const Todo = require('../db/todo')

module.exports = function(app) {
  app.use(views(`views`, { extension: 'ejs' }))

  router.get('/todo', async (ctx) => {
    ctx.status = 200
    let data = await Todo.find({})
    console.log(data)
    await ctx.render('todo', {todos: data})
  })

  router.post('/todo', async (ctx) => {
    console.log('!!!!!',ctx.request.body)
    let data = await Todo.create({
      taskText: ctx.request.body.taskText
    });
    ctx.status = 201
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = data
  })

  router.delete('/todo/:id', (ctx) => {
    console.log(ctx.params)
    ctx.body = 'ok'
  })

  app.use(bodyParser());
  app.use(router.routes());
}



