const mongoose = require('mongoose')

const Schema = mongoose.Schema

const caseSchema = Schema({
  venueState: {
    type: String
  },
  legalAdviceDescription: {
    type: String
  },
  areaOfLaw: {
    type: String
  },
  consultationConnectionMethod: {
    type: String
  },
  futureConsultationDateTime: {
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
    ref: 'User',
    required: true,
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }
})

module.exports = mongoose.model('Case', caseSchema)