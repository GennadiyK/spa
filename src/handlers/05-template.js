const views = require('koa-views')

exports.init = app => app.use(views(`src/views`, { extension: 'ejs' }))
