const {apiPrefix} = require('../../../config.json')
const User = require('../../db/user')
const request = require('request-promise')

let existingUserData = {
  email: 'admin@mail.ru',
  password: '12345'
}

let testUser
let locationHeader

exports.login = async () => {
  let options = {
    method: 'POST',
    uri: `${apiPrefix}/login`,
    body: existingUserData,
    json: true,
    resolveWithFullResponse: true
  }
  try {
    await request(options)
  } catch (err) {
    if (err.statusCode === 302) {
      locationHeader = err.response.headers.location
      console.log(locationHeader)
    }
  }
  let optionsSecond = {
    method: 'GET',
    uri: `${apiPrefix + locationHeader}`,
    resolveWithFullResponse: true
  }
  await request(optionsSecond)
}

exports.createUser = async () => {
  testUser = new User()
  testUser.email = existingUserData.email
  testUser.password = testUser.generateHash(existingUserData.password)
  await testUser.save()
}

exports.getUser = () => {
  return User.find({'_id': testUser._id})
}

exports.deleteUser = async () => {
  await User.findOneAndRemove({'_id': testUser._id})
}
