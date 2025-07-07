import JWT from 'jsonwebtoken'

const generateToken = (payload, secretKey, tokenLife) => {
  return JWT.sign(payload, secretKey, { expiresIn: tokenLife })
}

const verifyToken = (token, secretKey) => {
  return JWT.verify(token, secretKey)
}

export const jwtProvider = { generateToken, verifyToken }
