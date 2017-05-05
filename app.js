const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const todoController = require('./controllers/todoController')
app.use(serve('./assert'))

todoController(app)
app.listen(3000)