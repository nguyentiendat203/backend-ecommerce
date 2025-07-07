import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/helpers/ApiError.helper'

import { ROLES_SHOP, shopModel } from '~/models/shop.model'
import { jwtProvider } from '~/providers/jwt.provider'
import keyTokenService from '~/services/keyToken.service'
import { utils } from '~/utils'

class AuthService {
  static signUp = async (reqBody) => {
    const { name, email, password } = reqBody
    const shop = await shopModel.findOne({ email })
    if (shop) {
      throw new ApiError('Email has been existed!', StatusCodes.BAD_REQUEST)
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newShop = await shopModel.create({ name, email, password: hashedPassword, roels: [ROLES_SHOP.SHOP] })
    return {
      message: 'Register sucessfully',
      data: utils.pickData(newShop, ['_id', 'email', 'name'])
    }
  }

  static login = async (reqBody) => {
    try {
      const { email, password } = reqBody
      if (!email || !password) {
        throw new ApiError('Email and password are not empty', StatusCodes.BAD_REQUEST)
      }

      const user = await shopModel.findOne({ email })
      if (!user) {
        throw new ApiError('Email does not exist', StatusCodes.NOT_FOUND)
      }

      const matchUser = await bcrypt.compare(password, user.password)
      if (!matchUser) {
        throw new ApiError('Invalid credentials', StatusCodes.BAD_REQUEST)
      }
      // Create private key and public key
      const privateKey = keyTokenService.generateKey()
      const publicKey = keyTokenService.generateKey()

      // Generate Token
      const accessToken = jwtProvider.generateToken({ userId: user._id, email }, privateKey, '1h')
      const refreshToken = jwtProvider.generateToken({ userId: user._id, email }, privateKey, '14 days')

      await keyTokenService.createKeyToken(user._id, privateKey, publicKey, refreshToken)

      return {
        user: utils.pickData(user, ['_id', 'email', 'name']),
        accessToken,
        refreshToken
      }
    } catch (error) {
      throw error
    }
  }
}

export default AuthService
