const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/auth')

const resolver = {

  createUser: async (args) => {
    const isExistingUser = await User.findOne({ email: args.userInput.email })
    if (isExistingUser){
      throw new Error ('User already exist')
    }
    const passwordEncryption = await bcrypt.hash(args.userInput.password, 12)

    const user = new User({
      firstName: args.userInput.firstName,
      lastName: args.userInput.lastName,
      email: args.userInput.email,
      password: passwordEncryption,
    })

    const result = await user.save()
    return result
  },
  
  login: async ({ email, password}) => {
    const user = await User.findOne({ email: email })
    if (!user){
      throw new Error ('User does not exist')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual){
      throw new Error ('Password is incorrect')
    } 
    const token = jwt.sign({ userId: user.id , email: user.email }, 'webtokenkey');
    return { userId: user.id, token: token }
  }
}

module.exports = resolver