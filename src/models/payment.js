const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = Schema({
  paymentMethod: {
    type: String
  },
  dateTime: {
    type: Date
  },
  amount: {
    type: Number
  },
  calculatedAttorneyAmount: {
    type: Number
  },
  attorneyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('Payment', paymentSchema)