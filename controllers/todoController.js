const router = require('koa-router')()
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const {apiPrefix} = require('../config.json')
const Todo = require('../db/todo')


module.exports = function(app) {
  app.use(views(`views`, { extension: 'ejs' }))

  router.get('/todo', async (ctx) => {
    ctx.status = 200
    let data = await Todo.find({})
    console.log(data)
    await ctx.render('todos', {todos: data, port: apiPrefix})
  })

  router.get('/todo/edit/:id', async (ctx) => {
    let data = await Todo.find({'_id': ctx.params.id})
    console.log(ctx.port)
    ctx.body = data
    ctx.status = 200
  })

  router.post('/todo', async (ctx) => {
    let data = await Todo.create({
      taskTitle: ctx.request.body.taskTitle,
      taskText: ctx.request.body.taskText
    });
    ctx.status = 200
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = data
  })

  router.put('/todo/:id', async (ctx) => {
    // let res = await Todo.findOneAndRemove({'_id': ctx.params.id})
    ctx.status = 201
    console.log(ctx.params.id)
  })

  router.delete('/todo/:id', async (ctx) => {
     let res = await Todo.findOneAndRemove({'_id': ctx.params.id})
    console.log(res)
     ctx.body = res
  })

  app.use(bodyParser());
  app.use(router.routes());
}



