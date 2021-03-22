const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config/keys')
const schema = require('./src/graphql/schema')
const resolver = require('./src/graphql/resolver')

mongoose.connect(MONGO_URI, { useNewUrlParser : true }, err => {
  if (err){
    console.log(err)
  } else {
    console.log('MongoDB connected successfully')
  }
})

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolver,
  graphiql: true
  }) 
);

app.listen(4000, () => console.log('Server is up and running'))