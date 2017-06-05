let todo = require('./todo')

async function main () {
  await todo.load()
}

module.exports = main
