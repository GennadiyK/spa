const serve = require('koa-static')
const Koa = require('koa')
const app = module.exports = new Koa()
const {serverPort} = require('./config.json')
const todoController = require('./src/controllers/todoController')
app.use(serve('./src/assert/css'))
app.use(serve('./src/assert/img'))

todoController(app)
app.listen(serverPort)
console.log("Application started. Listening on port:" + serverPort);