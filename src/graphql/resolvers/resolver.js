const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../../config/keys')
const User = require('../../models/user')

const resolver = {

  createUser: async (args) => {
    const { email, password } = args.userInput
    const isExistingUser = await User.findOne({ email })
    if (isExistingUser){
      throw new Error ('User already exist')
    }
    const passwordEncryption = await bcrypt.hash(password, 12)

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
    const user = await User.findOne({ email })
    if (!user){
      throw new Error ('User does not exist')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual){
      throw new Error ('Password is incorrect')
    } 
    const token = jwt.sign({ userId: user.id , email: user.email }, JWT_KEY);
    return { userId: user.id, token }
  }
}

module.exports = resolver