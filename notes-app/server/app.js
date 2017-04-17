const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('./utils/DateBaseUtils')

db.setupConnection()

router.get('/notes', (ctx) => {
  db.listNotes().then(data => {
    ctx.body = data
  })
})

router.post('/notes', async (ctx) => {
  let res = await db.createNote(ctx.request.body)
  ctx.body = res
  ctx.status = 201
})

router.delete('/notes/:id', (ctx) => {
  db.deleteNote(ctx.param.id).then(data => {
    ctx.body = data
  })
})

app.use(bodyParser())
app.use(router.routes())
app.listen(3000, () => {
  console.log('server is running on localhost:3000')
})
