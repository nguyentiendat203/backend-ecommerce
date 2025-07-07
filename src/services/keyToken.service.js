import crypto from 'node:crypto'
import { keyTokenModel } from '~/models/keyToken.model'

class KeyTokenService {
  static generateKey = () => {
    return crypto.randomBytes(64).toString('hex')
  }

  static createKeyToken = async (userId, privateKey, publicKey, refreshToken) => {
    try {
      return await keyTokenModel.create({ user: userId, privateKey, publicKey })
    } catch (error) {
      throw error
    }
  }
}

export default KeyTokenService
