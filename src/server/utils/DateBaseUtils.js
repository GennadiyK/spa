const mongoose = require('mongoose')
const Note = require('models/Note')
const config = require('etc/config.json')

mongoose.Promise = Promise
mongoose.set('debug', true)

module.exports = {
  setupConnection: () => {
    mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`)
  },
  listNotes: async () => {
    return Note.find({})
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
    return Note.findOneAndRemove({_id: id})
  }
}
