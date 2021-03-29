const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const { JWT_KEY } = require('../../config/keys')
const User = require('../../models/user')

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

  login: async ({ email, password}) => {
    const user = await User.findOne({ email })
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
  }
}

module.exports = resolver