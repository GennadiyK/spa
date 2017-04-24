const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('./utils/DateBaseUtils')
const {serverPort} = require('etc/config.json')

db.setupConnection()

router.get('/notes', async (ctx) => {
  let res = await db.listNotes()
  ctx.body = res
  ctx.status = 200
})

router.post('/notes', async (ctx) => {
  let res = await db.createNote(ctx.request.body)
  ctx.body = res
  ctx.status = 201
})

router.delete('/notes/:id', async (ctx) => {
  let res = await db.deleteNote(ctx.params.id)
  ctx.body = res
  ctx.status = 200
})

app.use(bodyParser())
app.use(router.routes())
app.listen(3000, () => {
  console.log(`server is running on localhost:${serverPort}`)
})
