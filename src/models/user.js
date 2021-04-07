const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: Number,
    required: true
  },
  stateOfLicense: {
    type: String,
  },
  dataRatesMsg: {
    type: Boolean,
  },
  phoneNumber: {
    type: String,
  },
  practiceAreas: {
    type: Array
  },
  firmAssociation: {
    type: String
  },
  isCurrentlyInvolved: {
    type: Boolean,
  },
  terms: {
    type: Boolean,
  },
  channels: {
    type: Array,
  },
  ratings: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Rating"
  }],
  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  }],
  consultations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Consultation'
  },
  clients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Client'
  }
})

module.exports = mongoose.model('User', userSchema)