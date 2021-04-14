require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
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

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}))
app.use(cookieParser())
app.use('/graphql', graphqlHTTP((req, res) => {
  return {
    schema,
    rootValue: resolver,
    context: { auth: isAuth(req.cookies), res, req },
    graphiql: true
  }
})
);

app.listen(4000, () => console.log('Server is up and running'))