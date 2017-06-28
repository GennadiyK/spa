const router = require('koa-router')()
const Todo = require('../db/todo')
const passport = require('koa-passport')

module.exports = function (app) {
  router.get('/', async (ctx) => {
    await ctx.render('index')
  })

  router.get('/login', async (ctx) => {
    await ctx.render('login', { message: ctx.flash('loginMessage'), pageTitle: 'Login', action: 'login' })
  })

  router.get('/signup', async (ctx) => {
    await ctx.render('signup', { message: ctx.flash('signupMessage'), pageTitle: 'Sign Up', action: 'signup' })
  })

  router.get('/logout', async (ctx) => {
    await ctx.logout()
    await ctx.redirect('/')
  })

  router.get('/profile', isLoggedIn, async (ctx) => {
    let data = await Todo.find({'userId': ctx.session.passport.user})
    await ctx.render('profile', {user: ctx.req.user, todos: data})
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
      userId: ctx.session.passport.user,
      taskTitle: ctx.request.body.taskTitle,
      taskText: ctx.request.body.taskText
    })

    ctx.status = 201
    ctx.res.setHeader('Content-Type', 'application/json')
    ctx.body = data
  })

  router.post('/signup', async (ctx, next) => {
    await passport.authenticate('signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true
    })(ctx, next)
  })

  router.post('/login', async (ctx, next) => {
    await passport.authenticate('login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true
    })(ctx, next)
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

  async function isLoggedIn (ctx, next) {
    if (ctx.isAuthenticated()) {
      return next()
    }
    await ctx.redirect('/')
  }

  app.use(router.routes())
}
