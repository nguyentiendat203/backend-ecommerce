import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/helpers/ApiError.helper'
import { ROLES_SHOP, shopModel } from '~/models/shop.model'
import { jwtProvider } from '~/providers/jwt.provider'
import { utils } from '~/utils'
import envConfig from '~/configs/env.config'

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

    const accessToken = jwtProvider.generateToken({ userId: user._id, email }, envConfig.app.acess_token_secret, '1h')
    const refreshToken = jwtProvider.generateToken({ userId: user._id, email }, envConfig.app.refresh_token_secret, '14 days')

    await shopModel.findByIdAndUpdate(user._id, { refreshToken }, { new: true })

    return {
      user: utils.pickData(user, ['_id', 'email', 'name']),
      accessToken,
      refreshToken
    }
  }

  static refreshNewAccessToken = async (token) => {
    if (!token) {
      throw new ApiError('No refresh token', StatusCodes.NOT_FOUND)
    }
    const decodedToken = jwtProvider.verifyToken(token, envConfig.app.refresh_token_secret)
    const { exp, iat, ...payload } = decodedToken

    const accessToken = jwtProvider.generateToken(payload, envConfig.app.acess_token_secret, '1h')

    return { accessToken }
  }

  static logout = async (user) => {
    await shopModel.findByIdAndUpdate(user._id, { refreshToken: null })
    return { message: 'Logout successfully' }
  }
}

export default AuthService
