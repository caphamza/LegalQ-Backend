const { buildSchema } = require ('graphql')

const schema = buildSchema(`
  type Login {
    user: UserStep4,
  } 

  type Data {
    data: UserStep4
  }

  type User {
    email: String!
    firstName: String!
    lastName: String!
    licenseNumber: String!
    state: String!
    verify: Boolean,
    code: Int
  }

  type UserStep1 {
    email: String!
    firstName: String!
    lastName: String!
    licenseNumber: String!
    state: String!
    phoneNumberUsageConsent: Boolean
    cellPhone: String!
  }

  type UserStep2 {
    email: String!
    firstName: String!
    lastName: String!
    phoneNumberUsageConsent: Boolean
    cellPhone: String!
    licenseNumber: String!
    state: String!
    practiceAreas: [String!]
    firmAssociation: String,
  }

  type UserStep3 {
    email: String!
    firstName: String!
    lastName: String!
    phoneNumberUsageConsent: Boolean
    cellPhone: String!
    licenseNumber: String!
    state: String!
    practiceAreas: [String!]
    firmAssociation: String
    investigations: Boolean
    currentProfessionalResponsibilityInvestigations: String
    tos: Boolean
  }

  type UserStep4 {
    email: String
    firstName: String
    lastName: String
    phoneNumberUsageConsent: Boolean
    cellPhone: String
    licenseNumber: String
    state: String
    verify: Boolean
    practiceAreas: [String]
    firmAssociation: String
    investigations: Boolean
    currentProfessionalResponsibilityInvestigations: String
    tos: Boolean
    commMethods: [String]
    approved: Boolean
    ratings: [Rating]
    consultations: [Consultation]
    cases: [Case]
    payments: [Payment]

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
    time: String
    length: String
    rating: Rating
    payment: Payment
    client: Client
    consultation: Consultation
    createdAt: String
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
    actualLength: Int
  }

  type Client {
    firstName: String
    lastName: String
    quickBloxId: String
  }

  type Payment {
    paymentMethod: String
    amount: Int
    calculatedAttorneyAmount: Int  
  }

  input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    licenseNumber: String!
    state: String!
  }

  input UserInputStep1 {
    firstName: String!
    lastName: String!
    phoneNumberUsageConsent: Boolean
    cellPhone: String!
    licenseNumber: String!
    state: String!
  }

  input UserInputStep2 {
    practiceAreas: [String!]
    firmAssociation: String
  }

  input UserInputStep3 {
    investigations: Boolean
    tos: Boolean!,
    currentProfessionalResponsibilityInvestigations: String
  }

  input UserInputStep4 {
    commMethods: [String!]
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

  input update {
    email: String
    firstName: String
    lastName: String
    phoneNumberUsageConsent: Boolean
    cellPhone: String
    licenseNumber: String
    state: String
    verify: Boolean
    practiceAreas: [String]
    firmAssociation: String
    investigations: Boolean
    currentProfessionalResponsibilityInvestigations: String
    tos: Boolean
    commMethods: [String]
    approved: Boolean
  }

  type RootQuery {
    getData: Data!
  }

  type RootMutation {
    login(email: String!, password: String!, mode: String): Login!
    getData: Data!
    getCases: [Case]
    createUser(userInput: UserInput) : User
    verifyEmail(code: String!): User
    createUserStep1(userInput: UserInputStep1): UserStep1
    createUserStep2(userInput: UserInputStep2): UserStep2
    createUserStep3(userInput: UserInputStep3): UserStep3
    createUserStep4(userInput: UserInputStep4): UserStep4
    createRating(input: RatingInput): Rating
    createCase(input: CaseInput): Case
    createConsultation(input: ConsultationInput): Consultation
    createClient(input: ClientInput): Client
    updateUser(userInput: update): UserStep4
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema