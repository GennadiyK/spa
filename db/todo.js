const mongoose = require('./mongoose')
let todoSchema = new mongoose.Schema({
  taskText: {
    type: String
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Todo', todoSchema)