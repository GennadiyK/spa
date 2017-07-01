const Todo = require('../../db/todo')

let todoTask = {
  taskTitle: 'Task title - TEST',
  taskText: 'Task text - TEST'
}

let task

exports.load = async () => {
  task = await Todo.create(todoTask)
  return task
}

exports.getTodo = () => {
  return Todo.find({'_id': task._id})
}

exports.updateTodo = (title, text) => {
  return Todo.findOneAndUpdate({ _id: task._id }, {'taskTitle': title, 'taskText': text}, { new: true })
}

exports.deleteTodo = async (id) => {
  if (id) {
    await Todo.findOneAndRemove({'_id': id})
  } else {
    await Todo.findOneAndRemove({'_id': task._id})
  }
}
