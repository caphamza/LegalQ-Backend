const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/keys')

module.exports = (req) => {
  const authHeader = req['authorization'];
  if (!authHeader){
    return false
  }
  const token = authHeader
  if (!token || token === ''){
    return false
  }
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, JWT_KEY)
  } catch (e) {
    return false
  }
  if (!decodeToken){
    return false;
  }
  const userId = decodeToken.userId;
  return userId
}