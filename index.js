require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./src/config/keys')
const schema = require('./src/graphql/schema/schema')
const resolver = require('./src/graphql/resolvers/resolver')
const isAuth = require('./src/middlewares/isAuth')


mongoose.connect(MONGO_URI, { 
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true }, err => {
  if (err){
    console.log(err)
  } else {
    console.log('MongoDB connected successfully')
  }
})

const app = express()

app.use('/graphql', graphqlHTTP((request) => {
  return {
    schema,
    rootValue: resolver,
    context: { auth: isAuth(request.headers) },
    graphiql: true
  }
})
);

app.listen(4000, () => console.log('Server is up and running'))