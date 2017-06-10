const serve = require('koa-static')
const Koa = require('koa')
const app = module.exports = new Koa()
const {serverPort} = require('./config.json')
const path = require('path')
const fs = require('fs')
const handlers = fs.readdirSync(path.join(__dirname, 'src', 'handlers')).sort()
const todoController = require('./src/controllers/todoController')
app.use(serve('./src/assert/css'))
app.use(serve('./src/assert/img'))

handlers.forEach((handler) => {
  return require('./src/handlers/' + handler).init(app)
})

todoController(app)
app.listen(serverPort)
console.log('Application started. Listening on port:' + serverPort)
