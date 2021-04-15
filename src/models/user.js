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
    type: String,
    required: true
  },
  state: {
    type: String,
  },
  code: {
    type: Number,
  },
  verify: {
    type: Boolean,
    default: false
  },
  phoneNumberUsageConsent: {
    type: Boolean,
    default: false
  },
  cellPhone: {
    type: String,
  },
  practiceAreas: {
    type: Array
  },
  firmAssociation: {
    type: String
  },
  investigations: {
    type: Boolean,
  },
  currentProfessionalResponsibilityInvestigations: {
    type: String
  },
  tos: {
    type: Boolean,
  },
  commMethods: {
    type: Array,
  },
  approved: {
    type: Boolean,
    default: false
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