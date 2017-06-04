const Todo = require('../../db/todo')

let todoTask = {
  taskTitle: 'Task title - TEST',
  taskText: 'Task text - TEST'
}

let task;


exports.load = async function () {
  task = await Todo.create(todoTask)
  return task
}

exports.getTodo = async function() {
  return await Todo.find({'_id': task._id})
}

exports.deleteTodo = async function () {
  await Todo.findOneAndRemove({'_id': task._id})
}