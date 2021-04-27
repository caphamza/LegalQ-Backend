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
const Payment = require ('../../models/payment')

const resolver = {

  createUser: async (args, context) => {
    const { res } = context
    try {
      const { email, password, firstName, lastName, licenseNumber, state  } = args.userInput
      if (!validator.isEmail(email)){
        return Error ('Invalid email format')
      }
      if (password.length < 8){
        return Error ('Password should be atleast 8 characters')
      }
      const isExistingUser = await User.findOne({ email })
      if (isExistingUser){
        return Error ('User already exist')
      }
      const passwordEncryption = await bcrypt.hash(password, 12)
      const code = Math.round(Math.random()*(999999-111111)+111111)

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password: passwordEncryption,
        licenseNumber,
        state,
        code,
      })
      const result = await user.save()
      const token = jwt.sign({ userId: user.id , email: user.email }, JWT_KEY);
      res.cookie("toki", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24
      })
      res.cookie('authenticated', true, {
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24
      })
      return result
    } catch (e) {
      return Error ('something went wrong')
    }
  },


  
  verifyEmail: async({ code }, context) => {
    const { auth } = context
    try {
      if (!auth) {
        return Error ('unauthorized')
      }
      if (!code) {
        return Error ('verification code missing')
      }
      const result = await User.findOne({ _id: auth })
      if (result.code != code){
        return Error('Invalid Code')
      }
      const res = await User.findOneAndUpdate({ _id: auth }, {
        verify: true
      }, {new: true})
      return res
    } 
    catch (e) {
      return Error ('something went wrong')
    }
  },

  createUserStep1: async(args, context) => {
    try {
      const { auth } = context
      if (!auth){
        return Error ('unauthorized')
      }
      const { firstName, lastName, cellPhone, phoneNumberUsageConsent = false , licenseNumber, state } = args.userInput
      const result = await User.findOneAndUpdate({ _id: auth }, {
        firstName,
        lastName, 
        cellPhone,
        phoneNumberUsageConsent,
        licenseNumber,
        state
      }, {new: true})
      return result
    } catch (e) {
      return Error ('Something went wrong')
    }
    
  },

  createUserStep2: async(args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      }
      const { practiceAreas, firmAssociation } = args.userInput
      const result = await User.findOneAndUpdate({ _id: auth }, {
        practiceAreas,
        firmAssociation
      }, { new: true })
      return result
    }
    catch (e) {
      return Error ('Something went wrong')
    }
  },
  
  createUserStep3: async(args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      }
      const { investigations, tos, currentProfessionalResponsibilityInvestigations } = args.userInput
      const result = await User.findOneAndUpdate({ _id: auth }, {
        investigations,
        currentProfessionalResponsibilityInvestigations,
        tos
      }, { new: true })
      return result
    }
    catch (e) {
      return Error ('Something went wrong')
    }
   
  },

  createUserStep4: async(args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      }
      const { commMethods } = args.userInput
      if (commMethods.length === 0){
        throw new Error ('Please select atleast 1 channel of communication')
      }
      const result = await User.findOneAndUpdate({ _id: auth }, {
        commMethods
      }, { new: true })
      return result
    }
    catch (e) {
      return Error ('Something went wrong')
    }
  },

  createRating: async (args, context) => {
    const { auth } = context;
    try {
      if (!auth){
        return Error ('unauthorized')
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
      await User.findByIdAndUpdate({ _id: auth} , {
        $push: { ratings: [result._id]}
      })
      return result
    } catch (e) {
      return Error ('Something went wrong')
    }
  },

  createCase: async (args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unathorized')
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
    }
    catch (e) {
      return Error ('Something went wrong')
    }
    
  },

  createConsultation: async (args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      }
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
    }
    catch (e) {
      return Error ('Something went wrong')
    }
  },

  createClient: async (args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      }
      const { firstName, lastName, quickBloxId } = args.input
      const client = Client({
        firstName,
        lastName,
        quickBloxId
      })
      const result = await client.save()
      return result
    }
    catch (e) {
      return Error ('Something went wrong')
    }
  },

  login: async ({ email, password }, context ) => {
    const { res } = context
    try {
      const user = await User.findOne({ email })
      .populate({ path: 'cases', model: 'Case'})
      .populate({ path: 'ratings', model: 'Rating'})
      .populate({ path: 'consultations', model: 'Consultation'}).exec()

      console.log("USER", user)
      if (!user){
        return Error ('User does not exist')
      }
      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual){
        return Error ('Password is incorrect')
      }
      const token = jwt.sign({ userId: user.id , email: user.email }, JWT_KEY);
      res.cookie("toki", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      res.cookie('authenticated', true, {
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      return { user }
    }
    catch (e) {
      return Error ('something went wrong')
    }  
  },

  updateUser: async (args, context) => {
    const { auth } = context
    try {
      if (auth){
        const {
          email,
          firstName,
          lastName,
          phoneNumberUsageConsent,
          cellPhone,
          licenseNumber,
          state,
          verify,
          practiceAreas,
          firmAssociation,
          investigations,
          currentProfessionalResponsibilityInvestigations,
          tos,
          commMethods
        } = args.userInput
  
        const result = await User.findByIdAndUpdate(auth, {
          email,
          firstName,
          lastName,
          phoneNumberUsageConsent,
          cellPhone,
          licenseNumber,
          state,
          verify,
          practiceAreas,
          firmAssociation,
          investigations,
          currentProfessionalResponsibilityInvestigations,
          tos,
          commMethods
        }, {new: true})
  
        return result
    }
    else return Error ('unauthorized')
    
    } catch (e) {
      console.log('Err--', e)
      return Error ('Something went wrong')
    }

  },

  getData: async (args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      } 
      const data = await User.findOne({ _id: auth })
      .populate({ path: 'cases', model: 'Case'})
      .populate({ path: 'ratings', model: 'Rating'})
      .populate({ path: 'consultations', model: 'Consultation'})
      .populate({ path: 'payments', model: 'Payment'})
      if (!data){
        return Error('User does not exist') 
      }

      return{
        data
      }
    }
    catch (e) {
      console.log('ERR', e)
      return Error ('something went wrong')
    }
  },

  getCases: async (args, context) => {
    const { auth } = context
    try {
      if (!auth){
        return Error ('unauthorized')
      } 
      const data = await Case.find({ attorneyId: auth })
      .populate({ path: 'payment', Model: 'Payment' })
      .populate({ path: 'client', Model: 'Client'})
      .populate({ path: 'consultation', model: 'Consultation'})
      return data
    }
    catch (e) {
      return Error ('Something went wrong')
    }
  }

}

module.exports = resolver