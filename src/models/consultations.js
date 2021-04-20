const mongoose = require('mongoose')

const Schema = mongoose.Schema

const consultationSchema = Schema({
  connectionMethod: {
    type: String
  },
  dateTimeOccurred: {
    type: Date
  },
  videoConnectionToken: {
    type: String
  },
  chatConnectionToken: {
    type: String
  },
  conversationTranscript: {
    type: String
  },
  status: {
    type: String
  },
  clientPrefferedConnectionMethod: {
    type: String
  },
  purchasedLength: {
    type: String
  },
  actualLength: {
    type: String
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  attorneyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }
})

module.exports = mongoose.model('Consultation', consultationSchema)