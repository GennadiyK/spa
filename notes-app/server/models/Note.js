const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  title: {type: String},
  text: {type: String, required: true},
  color: {type: String},
  creatdAt: {type: Date}
})

module.exports = mongoose.model('Note', NoteSchema)