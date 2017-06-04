const Todo = require('../../db/todo')

let todoTask = {
  taskTitle: 'Task title - TEST',
  taskText: 'Task text - TEST'
}

exports.load = async function () {
  return await Todo.create(todoTask)
}
