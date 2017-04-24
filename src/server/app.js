const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('utils/DateBaseUtils')
const views = require('koa-views')
const {serverPort} = require('etc/config.json')

db.setupConnection()

app.use(views(__dirname, { extension: 'ejs' }))

router.get('/notes', async (ctx) => {
  let notes = await db.listNotes()
  await ctx.render('../views/index.ejs', {notes: notes})
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
app.listen(serverPort, () => {
  console.log(`server is running on localhost:${serverPort}`)
})
