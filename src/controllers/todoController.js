const router = require('koa-router')()
const Todo = require('../db/todo')
const User = require('../db/user')
const passport = require('koa-passport')
const nodemailer = require('../lib/mailer')
let fs = require('fs')

module.exports = function (app) {
  router.get('/', async (ctx) => {
    await ctx.render('index')
  })

  router.get('/login', async (ctx) => {
    await ctx.render('login', { message: ctx.flash('loginMessage'), pageTitle: 'Login', action: 'login', csrf: ctx.csrf })
  })

  router.get('/login/facebook', async (ctx, next) => {
    await passport.authenticate('facebook', {
      scope: 'email'
    })(ctx, next)
  })

  router.get('/login/facebook/callback', async (ctx, next) => {
    await passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })(ctx, next)
  })

  router.get('/signup', async (ctx) => {
    await ctx.render('signup', { message: ctx.flash('signupMessage'), pageTitle: 'Sign Up', action: 'signup', csrf: ctx.csrf })
  })

  router.get('/logout', async (ctx) => {
    await ctx.logout()
    ctx.redirect('/')
  })

  router.get('/profile', isLoggedIn, async (ctx) => {
    let data = await Todo.find({'userId': ctx.session.passport.user})
    await ctx.render('profile', {user: ctx.req.user, todos: data, csrf: ctx.csrf})
  })

  router.get('/todo/edit/:id', isLoggedIn, async (ctx, next) => {
    let data = await Todo.findOne({'_id': ctx.params.id})
    ctx.status = 200
    await ctx.render('todoEdit', { todo: data })
  })

  router.post('/todo', isLoggedIn, async (ctx) => {
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
    let {email, password} = ctx.request.body
    try {
      let user = await User.findOne({'email': email})
      if (user) {
        ctx.flash('signupMessage', 'That email is already taken.')
        ctx.redirect('/signup')
      } else {
        let newUser = new User()
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        let savedUser = await newUser.save()
        await ctx.login(savedUser)
        ctx.redirect('/profile')

        let html = new Promise((resolve, reject) => {
          fs.readFile(`${__dirname}/../views/email.ejs`, 'utf8', (error, data) => {
            if (error) {
              reject(error)
            }
            resolve(data)
          })
        })

        let mailOprions = {
          from: '"Gennadiy Kalinouski" <7742589@gmail.com>',
          to: email,
          subject: 'You registered successfully!',
          html: await html
        }

        nodemailer.sendMail(mailOprions)
      }
    } catch (err) {
      throw err
    }
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
      let task = await Todo.findOneAndUpdate({ _id: ctx.params.id }, {'taskTitle': taskTitle, 'taskText': taskText}, { new: true })
      ctx.status = 200
      ctx.body = task
    } catch (err) {
      throw err
    }
  })

  router.delete('/todo/:id', isLoggedIn, async (ctx) => {
    let res = await Todo.findOneAndRemove({'_id': ctx.params.id})
    ctx.body = res
  })

  async function isLoggedIn (ctx, next) {
    if (ctx.isAuthenticated()) {
      return next()
    }
    ctx.redirect('/')
  }

  app.use(router.routes())
}
