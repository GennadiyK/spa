const {apiPrefix, serverPort} = require('../../config.json')
const app = require('../../app')
const loadFixtures = require('./fixtures/fixtures')
const todo = require('./fixtures/todo')
let assert = require('assert');
const request = require("request").defaults({
  encoding: null
});

let server, task

describe('todo REST API', () => {
  before((done) => {
    server = app.listen(serverPort, '127.0.0.1', done);
  })

  after( done => {
    server.close(done)
  })

  beforeEach(async () => {
    await loadFixtures()
  })

  afterEach(async () => {
    todo.deleteTodo()
  })

  describe('GET /todo', function(){
    it('should return task from db', async () => {
      let [task] = await todo.getTodo()
      assert.equal(task.taskTitle, 'Task title - TEST');
      assert.equal(task.taskText, 'Task text - TEST');
    })
  })
});