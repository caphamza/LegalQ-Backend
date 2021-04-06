const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { JWT_KEY } = require('../../config/keys')
const User = require('../../models/user')
const Rating = require('../../models/rating')
const Case = require('../../models/case')
const Consultation = require('../../models/consultations')
const Client = require('../../models/client')

const resolver = {

  createUser: async (args) => {
    const { email, password, firstName, lastName, licenseNumber, stateOfLicense  } = args.userInput
    if (!validator.isEmail(email)){
      throw new Error('Invalid email format')
    }
    if (password.length < 8){
      throw new Error('Password should be atleast 8 characters')
    }
    const isExistingUser = await User.findOne({ email })
    if (isExistingUser){
      throw new Error ('User already exist')
    }
    const passwordEncryption = await bcrypt.hash(password, 12)
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: passwordEncryption,
      licenseNumber,
      stateOfLicense
    })

    const result = await user.save()
    return result
  },

  createUserStep1: async(args) => {
    const { email, firstName, lastName, phoneNumber, dataRatesMsg = false , licenseNumber, stateOfLicense} = args.userInput
    const result = await User.findOneAndUpdate({ email }, {
      firstName,
      lastName, 
      phoneNumber,
      dataRatesMsg,
      licenseNumber,
      stateOfLicense
    }, {new: true})
    return result
  },

  createUserStep2: async(args) => {
    const { practiceAreas, firmAssociation, email } = args.userInput
    const result = await User.findOneAndUpdate({ email }, {
      practiceAreas,
      firmAssociation
    }, { new: true })
    return result
  },
  
  createUserStep3: async(args) => {
    const { isCurrentlyInvolved, terms, email } = args.userInput
    const result = await User.findOneAndUpdate({ email }, {
      isCurrentlyInvolved,
      terms
    }, { new: true })
    return result
  },

  createUserStep4: async(args) => {
    const { channels, email} = args.userInput
    if (channels.length === 0){
      throw new Error ('Please select atleast 1 channel of communication')
    }
    const result = await User.findOneAndUpdate({ email }, {
      channels
    }, { new: true })
    return result
  },

  createRating: async (args, context) => {
    const { auth } = context;
    if (!auth){
      throw new Error ('unauthorized')
    }
    const { overallScore, friendlinessScore, knowledgeScore, feedbackText } = args.input
    const rating = new Rating({
      overallScore,
      friendlinessScore,
      knowledgeScore,
      feedbackText,
      attorneyId: auth
    })
    const result = await rating.save()
    await User.findByIdAndUpdate(auth, {
      $push: { earnings: [result._id]}
    })
    return result
  },

  createCase: async (args, context) => {
    const { auth } = context
    console.log('Con3', auth)
    if (!auth){
      throw new Error('unathorized')
    }
    const { venueState, legalAdviceDescription, areaOfLaw, consultationConnectionMethod, futureConsultationDateTime } = args.input
    const cas = new Case({
      venueState, 
      legalAdviceDescription, 
      areaOfLaw, 
      consultationConnectionMethod, 
      futureConsultationDateTime, 
      attorneyId: auth
    })
    const result = await cas.save()
    await User.findByIdAndUpdate(auth, {
      $push: { cases: [result._id]}
    })
    return result
  },

  createConsultation: async (args) => {
    const { 
      connectionMethod,
      dateTimeOccurred,
      videoConnectionToken,
      chatConnectionToken,
      conversationTranscript,
      status,
      clientPrefferedConnectionMethod,
      purchasedLength,
      actualLength,
      createdAt,
      updatedAt,
      attorneyId } = args.input
    const consultation = new Consultation({
      connectionMethod,
      dateTimeOccurred,
      videoConnectionToken,
      chatConnectionToken,
      conversationTranscript,
      status,
      clientPrefferedConnectionMethod,
      purchasedLength,
      actualLength,
      createdAt,
      updatedAt,
      attorneyId
    })
    const result = consultation.save()
    return result
  },

  createClient: async (args) => {
    const { firstName, lastName, quickBloxId } = args.input
    const client = Client({
      firstName,
      lastName,
      quickBloxId
    })
    const result = await client.save()
    return result
  },

  login: async ({ email, password, mode }) => {
    let user
    if (mode === 'cases'){
      user = await User.findOne({ email })
      .populate({ path: 'cases', model: 'Case'})
    } else if (mode === 'ratings'){
      user = await User.findOne({ email })
      .populate({ path: 'ratings', model: 'Rating'})
    } else if (mode === 'consultations'){
      user = await User.findOne({ email })
      .populate({ path: 'consultations', model: 'Consultation'})
    } else {
      user = await User.findOne({ email })
      .populate({ path: 'cases', model: 'Case'})
      .populate({ path: 'ratings', model: 'Rating'})
      .populate({ path: 'consultations', model: 'Consultation'})
    }
    if (!user){
      throw new Error ('User does not exist')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual){
      throw new Error ('Password is incorrect')
    }
    const token = jwt.sign({ userId: user.id , email: user.email }, JWT_KEY);
    return { 
      token,  
      user
    }
  },

}

module.exports = resolver