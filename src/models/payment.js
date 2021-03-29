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
    type: Float32Array
  },
  calculatedAttorneyAmount: {
    type: Float32Array
  },
  stripeToken: {
    type: String
  },
})

module.exports = mongoose.model('Payment', paymentSchema)