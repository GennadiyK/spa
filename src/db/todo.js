const mongoose = require('./mongoose')
let todoSchema = new mongoose.Schema({
  taskTitle: {
    type: String
  },
  taskText: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Todo', todoSchema)
