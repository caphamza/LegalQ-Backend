const { buildSchema } = require ('graphql')

const schema = buildSchema(`
  type Login {
    token: String!
    user: UserStep4 ,
  } 

  type Data {
    user: UserStep4,
    ratings: [Rating]
    cases: [Case] 
  }

  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    licenseNumber: Int!
    stateOfLicense: String!
  }

  type UserStep1 {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    licenseNumber: Int!
    stateOfLicense: String!
    dataRatesMsg: Boolean
    phoneNumber: String!
  }

  type UserStep2 {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    dataRatesMsg: Boolean
    phoneNumber: String!
    licenseNumber: Int!
    stateOfLicense: String!
    practiceAreas: [String!]
    firmAssociation: String
  }

  type UserStep3 {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    dataRatesMsg: Boolean
    phoneNumber: String!
    licenseNumber: Int!
    stateOfLicense: String!
    practiceAreas: [String!]
    firmAssociation: String
    isCurrentlyInvolved: String
    terms: String
  }

  type UserStep4 {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    dataRatesMsg: Boolean
    phoneNumber: String!
    licenseNumber: Int!
    stateOfLicense: String!
    practiceAreas: [String!]
    firmAssociation: String
    isCurrentlyInvolved: String
    terms: String
    channels: [String]
    ratings: [Rating]
    consultations: [Consultation]
    cases: [Case]
  }

  type Rating {
    overallScore: Int!
    friendlinessScore: Int
    knowledgeScore: Int
    feedbackText: String 
  }

  type Case {
    venueState: String
    legalAdviceDescription: String
    areaOfLaw: String
    consultationConnectionMethod: String
    futureConsultationDateTime: String
  }

  type Consultation {
    connectionMethod: String
    dateTimeOccurred: String
    videoConnectionToken: String
    chatConnectionToken: String
    conversationTranscript: String
    status: String
    clientPrefferedConnectionMethod: String
    purchasedLength: String
    actualLength: String
  }

  type Client {
    firstName: String
    lastName: String
    quickBloxId: String
  }

  input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    licenseNumber: Int!
    stateOfLicense: String!
  }

  input UserInputStep1 {
    email: String!
    firstName: String!
    lastName: String!
    dataRatesMsg: Boolean
    phoneNumber: String!
    licenseNumber: Int!
    stateOfLicense: String!
  }

  input UserInputStep2 {
    email: String!
    practiceAreas: [String!]
    firmAssociation: String
  }

  input UserInputStep3 {
    email: String!
    isCurrentlyInvolved: Boolean
    terms: Boolean!
  }

  input UserInputStep4 {
    email: String!
    channels: [String!]
  }

  input RatingInput {
    overallScore: Int!
    friendlinessScore: Int
    knowledgeScore: Int
    feedbackText: String
  }

  input CaseInput {
    venueState: String
    legalAdviceDescription: String
    areaOfLaw: String!
    consultationConnectionMethod: String
    futureConsultationDateTime: String
  }

  input ConsultationInput {
    connectionMethod: String
    dateTimeOccurred: String
    videoConnectionToken: String
    chatConnectionToken: String
    conversationTranscript: String
    status: String
    clientPrefferedConnectionMethod: String
    purchasedLength: String
    actualLength: String,
  }

  input ClientInput {
    firstName: String
    lastName: String
    quickBloxId: String
  }

  type RootQuery {
    login(email: String!, password: String!, mode: String): Login!
    getData(_id: String): Data!
  }

  type RootMutation {
    createUser(userInput: UserInput) : User
    createUserStep1(userInput: UserInputStep1): UserStep1
    createUserStep2(userInput: UserInputStep2): UserStep2
    createUserStep3(userInput: UserInputStep3): UserStep3
    createUserStep4(userInput: UserInputStep4): UserStep4
    createRating(input: RatingInput): Rating
    createCase(input: CaseInput): Case
    createConsultation(input: ConsultationInput): Consultation
    createClient(input: ClientInput): Client
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema