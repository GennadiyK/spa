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

  describe('API', () => {
    it('GET - should return task from db', async () => {
      let [task] = await todo.getTodo()
      expect(task.taskTitle).to.be('Task title - TEST')
      expect(task.taskText).to.be('Task text - TEST')
    })

    it('GET - should return html', async () => {
      let response = await request(`${apiPrefix}/todo`, {method: 'GET'})
      expect(response.statusCode).to.be(200)
      expect(response.body).to.be.ok()
      expect(response.headers['content-type']).to.be('text/html; charset=utf-8')
    })

    it('POST - should create new document', async () => {
      let task = {
        taskTitle: 'New task created',
        taskText: 'This is new task'
      }
      let response = await request(`${apiPrefix}/todo`, {method: 'POST', data: task})
      let body = JSON.parse(response.body)
      expect(response.statusCode).to.be(201)
      expect(body.taskTitle).to.be('New task created')
      expect(body.taskText).to.be('This is new task')
      await todo.deleteTodo(body._id)
    })
  })
})
