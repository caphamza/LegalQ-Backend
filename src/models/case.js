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
  } 
})

module.exports = mongoose.model('Case', caseSchema)