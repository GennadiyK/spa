/* eslint-env mocha */
const {apiPrefix, serverPort, serverHost} = require('../../config.json')
const app = require('../../app')
const loadFixtures = require('./fixtures/fixtures')
const todo = require('./fixtures/todo')
const user = require('./fixtures/user')
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

  afterEach(async () => {
    await todo.deleteTodo()
    await user.deleteUser()
  })

  describe('API', () => {
    it.only('GET task- should return task from db', async () => {
      let [task] = await todo.getTodo()
      expect(task.taskTitle).to.be('Task title - TEST')
      expect(task.taskText).to.be('Task text - TEST')
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

    it('POST - should create new task', async () => {
      console.log('USER', user.getUser())
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
      console.log('!!!', response)
      // expect(response.statusCode).to.be(201)
      // expect(body.taskTitle).to.be('New task created')
      // expect(body.taskText).to.be('This is new task')
      // await todo.deleteTodo(body._id)
    })

    it('PUT - should update task', async () => {
      let [task] = await todo.getTodo()
      let newData = {
        taskTitle: 'New title',
        taskText: 'New text'
      }
      let options = {
        method: 'PUT',
        uri: `${apiPrefix}/todo/edit/${task._id}`,
        body: newData,
        json: true,
        resolveWithFullResponse: true
      }
      let response = await request(options)
      expect(response.statusCode).to.be(200)
      expect(response.body.error.taskTitle).to.be(newData.taskTitle)
      expect(response.body.error.taskText).to.be(newData.taskText)
    })

    it('DELETE - should delete task by ID from db', async () => {
      let [task] = await todo.getTodo()
      await todo.deleteTodo(task._id)
      let data = await todo.getTodo()
      expect(data.length).to.be(0)
    })
  })
})
