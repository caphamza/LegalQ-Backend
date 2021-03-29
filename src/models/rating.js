const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ratingSchema = Schema({
  overallScore: {
    type: Float32Array
  },
  friendlinessScore: {
    type: Float32Array
  },
  knowledgeScore: {
    type: Float32Array
  },
  feedbackText: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Rating', ratingSchema)