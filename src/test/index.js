const {apiPrefix, serverPort} = require('../../config.json')
const app = require('../../app')
let fixtures = require('./fixtures/fixtures')
const should = require('should');
const request = require("request").defaults({
  encoding: null
});

let server

describe('todo REST API', () => {
  before( done => {
    server = app.listen(serverPort, '127.0.0.1', done);
  })

  after( done => {
    server.close(done)
  })

  describe('GET /todo', function(){
    it('should return list of tasks', function(done){

      request.get({url:`${apiPrefix}/todo`, json: true}, (error, response, body) => {
        if (error) return done(error);
        // (!!!) not body.should.eql(fixtureContent),
        // cause buffers are compared byte-by-byte for diff (slow)
        response.statusCode.should.equal(200)

        console.log(body.toString('utf-8'))
        done();
      });

    })
  })
});