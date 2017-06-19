const router = require('koa-router')()
const Todo = require('../db/todo')
const User = require('../db/user')

module.exports = function (app) {
  router.get('/', async (ctx) => {
    await ctx.render('index')
  })

  router.get('/login', async (ctx) => {
    await ctx.render('login')
  })

  router.get('/logout', async (ctx) => {
    ctx.logout()
    ctx.redirect('/')
  })

  router.get('/todo', async (ctx) => {
    ctx.status = 200
    let data = await Todo.find({})
    await ctx.render('todos', {todos: data})
  })

  router.get('/todo/edit/:id', async (ctx) => {
    let [data] = await Todo.find({'_id': ctx.params.id})
    ctx.status = 200
    await ctx.render('todoEdit', { todo: data })
  })

  router.post('/todo', async (ctx) => {
    if (!(ctx.request.body.taskTitle || ctx.request.body.taskText)) {
      ctx.throw(400)
    }

    let data = await Todo.create({
      taskTitle: ctx.request.body.taskTitle,
      taskText: ctx.request.body.taskText
    })

    ctx.status = 201
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = data
  })

  router.post('/user', async (ctx) => {
    let user
    try {
      user = await User.create({
        email: ctx.request.body.email,
        password: ctx.request.body.password
      })
    } catch (err) {
      if (err.code === 11000) {
        ctx.throw(409)
      }
      throw err
    }

    ctx.status = 201
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = user
  })

  router.put('/todo/edit/:id', async (ctx) => {
    let {taskTitle, taskText} = ctx.request.body
    try {
      await Todo.findOneAndUpdate({ _id: ctx.params.id }, {'taskTitle': taskTitle, 'taskText': taskText}, { new: true })
      ctx.status = 200
      ctx.body = 'ok'
    } catch (err) {
      throw err
    }
  })

  router.delete('/todo/:id', async (ctx) => {
    let res = await Todo.findOneAndRemove({'_id': ctx.params.id})
    ctx.body = res
  })

  // function isLoggedIn (ctx, next) {
  //   if (ctx.isAuthenticated()) {
  //     return next()
  //   }
  //   ctx.rederect('/')
  // }

  app.use(router.routes())
}
