/* eslint-env mocha */
const {apiPrefix, serverPort, serverHost} = require('../../config.json')
const app = require('../../app')
const loadFixtures = require('./fixtures/fixtures')
const todo = require('./fixtures/todo')
const expect = require('expect.js')
const request = require('request-promise')

let server

describe('todo REST API', () => {
  before(async () => {
    server = app.listen(serverPort, serverHost)
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
      let options = {
        method: 'GET',
        uri: `${apiPrefix}/todo`,
        resolveWithFullResponse: true
      }
      let response = await request(options)
      expect(response.statusCode).to.be(200)
      expect(response.body).to.be.ok()
      expect(response.headers['content-type']).to.be('text/html; charset=utf-8')
    })

    it('GET - should return 404', async () => {
      let options = {
        method: 'GET',
        uri: `${apiPrefix}/test`,
        simple: false,
        resolveWithFullResponse: true
      }
      let response = await request(options)
      expect(response.statusCode).to.be(404)
    })

    it('POST - should create new document', async () => {
      let task = {
        taskTitle: 'New task created',
        taskText: 'This is new task'
      }
      let options = {
        method: 'POST',
        uri: `${apiPrefix}/todo`,
        body: task,
        json: true,
        resolveWithFullResponse: true
      }
      let response = await request(options)
      let body = response.body.error
      expect(response.statusCode).to.be(201)
      expect(body.taskTitle).to.be('New task created')
      expect(body.taskText).to.be('This is new task')
      await todo.deleteTodo(body._id)
    })
  })
})
