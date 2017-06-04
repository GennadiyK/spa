const router = require('koa-router')()
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const {apiPrefix} = require('../../config.json')
const Todo = require('../db/todo')


module.exports = function(app) {
  app.use(views(`src/views`, { extension: 'ejs' }))

  router.get('/todo', async (ctx) => {
    ctx.status = 200
    let data = await Todo.find({})
    await ctx.render('todos', {todos: data, port: apiPrefix})
  })

  router.get('/todo/edit/:id', async (ctx) => {
    let [data] = await Todo.find({'_id': ctx.params.id})
    console.log(data)
    ctx.status = 200
    await ctx.render('todoEdit', { todo: data })
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

  router.put('/todo/edit/:id', async (ctx) => {
    let {taskTitle, taskText} = ctx.request.body
    try {
      let data = await Todo.findOneAndUpdate({ _id: ctx.params.id }, { 'taskTitle': taskTitle,'taskText': taskText}, { new : true })
      ctx.status = 200
      ctx.body = 'ok'
    } catch (err) {
      throw(err)
    }


  })

  router.delete('/todo/:id', async (ctx) => {
     let res = await Todo.findOneAndRemove({'_id': ctx.params.id})
    console.log(res)
     ctx.body = res
  })

  app.use(bodyParser());
  app.use(router.routes());
}



