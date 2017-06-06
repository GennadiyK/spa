const Todo = require('../../db/todo')

let todoTask = {
  taskTitle: 'Task title - TEST',
  taskText: 'Task text - TEST'
}

let task

exports.load = async function () {
  task = await Todo.create(todoTask)
  return task
}

exports.getTodo = function () {
  return Todo.find({'_id': task._id})
}

exports.deleteTodo = async function (id) {
  if (id) {
    await Todo.findOneAndRemove({'_id': id})
  } else {
    await Todo.findOneAndRemove({'_id': task._id})
  }
}
