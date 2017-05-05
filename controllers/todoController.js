const router = require('koa-router')()

module.exports = function(app) {
  router.get('/todo', (ctx) => {
    console.log('get')
  })

  router.post('/todo', (ctx) => {
    console.log('post')
  })


  router.delete('/todo', (ctx) => {
    console.log('delete')
  })



  app.use(router.routes());
}



