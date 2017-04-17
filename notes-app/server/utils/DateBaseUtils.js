const mongoose = require('mongoose')
const Note = require('../models/Note')

mongoose.Promise = Promise
mongoose.set('debug', true)

module.exports = {
  setupConnection: () => {
    mongoose.connect('mongodb://localhost/notes')
  },
  listNotes: async () => {
    await Note.find({})
  },
  createNote: async (data) => {
    let note = await Note.create({
      title: data.title,
      text: data.text,
      color: data.color,
      createAt: new Date()
    })

    return note.save()
  },
  deleteNote: async (id) => {
    await Note.remove({_id: id})
  }
}
