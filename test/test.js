const assert = require('assert')
const {serverPort} = require('../config.json')
const app = require('../app')
let server

describe('todo REST API', () => {
  before( done => {
    server = app.listen(serverPort, '127.0.0.1', done);
  })

  after( done => {
    server.close(done)
  })

  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
    })
  })
});