let todo = require('./todo')
let user = require('./user')

async function main () {
  await todo.load()
  await user.createUser()
  await user.login()
}

module.exports = main
