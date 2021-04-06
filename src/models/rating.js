const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ratingSchema = Schema({
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
  feedbackText: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  attorneyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('Rating', ratingSchema)