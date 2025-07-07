import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

import { ROLES_SHOP, shopModel } from '~/models/shop.model'
import { jwtProvider } from '~/providers/jwt.provider'
import keyTokenService from '~/services/keyToken.service'
import { utils } from '~/utils'

class AuthService {
  static signUp = async (reqBody) => {
    const { name, email, password } = reqBody
    try {
      const shop = await shopModel.findOne({ email })
      if (shop) {
        return {
          code: 'xxx',
          message: 'Email has been existed!',
          status: 400
        }
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      await shopModel.create({ name, email, password: hashedPassword, roels: [ROLES_SHOP.SHOP] })
      return {
        message: 'Register sucessfully'
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: '400'
      }
    }
  }

  static login = async (reqBody) => {
    try {
      const { email, password } = reqBody
      if (!email || !password) {
        return { status: 400, message: 'Vui lòng nhập email và mật khẩu' }
      }

      const user = await shopModel.findOne({ email })
      if (!user) {
        return { status: 400, message: 'Email ko tồn tại' }
      }

      const matchUser = await bcrypt.compare(password, user.password)
      if (!matchUser) {
        return { status: 400, message: 'Mật khẩu không chính xác' }
      }
      // Create private key and public key
      const privateKey = keyTokenService.generateKey()
      const publicKey = keyTokenService.generateKey()

      // Generate Token
      const accessToken = jwtProvider.generateToken({ userId: user._id, email }, privateKey, '1h')
      const refreshToken = jwtProvider.generateToken({ userId: user._id, email }, privateKey, '14 days')

      await keyTokenService.createKeyToken(user._id, privateKey, publicKey, refreshToken)

      return {
        status: 200,
        data: {
          user: utils.pickData(user, ['_id', 'email', 'name']),
          accessToken,
          refreshToken
        }
      }
    } catch (error) {
      throw error
    }
  }
}

export default AuthService
