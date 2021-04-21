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
    type: Object,
    overallScore: {
      type: Number,
      required: true
    },
    friendlinessScore: {
      type: Number
    },
    knowledgeScore: {
      type: Number
    },
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }
})

module.exports = mongoose.model('Case', caseSchema)