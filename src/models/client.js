const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  quickBloxId: {
    type: String
  }
})

module.exports = mongoose.model('Client', clientSchema)