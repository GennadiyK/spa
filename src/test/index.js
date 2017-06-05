/* eslint-env mocha */
const {apiPrefix, serverPort} = require('../../config.json')
const app = require('../../app')
const loadFixtures = require('./fixtures/fixtures')
const todo = require('./fixtures/todo')
const expect = require('expect.js')
const request = require('async-request')

let server

describe('todo REST API', () => {
  before((done) => {
    server = app.listen(serverPort, '127.0.0.1', done)
  })

  after(done => {
    server.close(done)
  })

  beforeEach(async () => {
    await loadFixtures()
  })

  afterEach(() => {
    todo.deleteTodo()
  })

  describe('GET /todo', () => {
    it('should return task from db', async () => {
      let [task] = await todo.getTodo()
      expect(task.taskTitle).to.be('Task title - TEST')
      expect(task.taskText).to.be('Task text - TEST')
    })

    it('should return html', async () => {
      let response = await request(`${apiPrefix}/todo`, {method: 'GET'})
      expect(response.statusCode).to.be(200)
      expect(response.body).to.be.ok()
      expect(response.headers['content-type']).to.be('text/html; charset=utf-8')
    })
  })
})
