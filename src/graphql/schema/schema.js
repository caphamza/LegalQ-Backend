const { buildSchema } = require ('graphql')

const schema = buildSchema(`
  type Login {
    userId : ID!
    token: String!
  } 

  type User {
    _id: ID!
    email: String!
    password: String
  }

  input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  type RootQuery {
    login(email: String!, password: String!): Login!
  }

  type RootMutation {
    createUser(userInput: UserInput) : User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema