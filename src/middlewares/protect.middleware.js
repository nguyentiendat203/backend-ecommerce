import { StatusCodes } from 'http-status-codes'

import envConfig from '~/configs/env.config'
import ApiError from '~/helpers/ApiError.helper'
import { shopModel } from '~/models/shop.model'
import { jwtProvider } from '~/providers/jwt.provider'
import { utils } from '~/utils'

export const protectRoute = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) {
      return next(new ApiError('Unauthenticated', StatusCodes.UNAUTHORIZED))
    }

    // 2) Verification token
    const decodedToken = jwtProvider.verifyToken(accessToken, envConfig.app.acess_token_secret)
    // 3) Check if user still exists
    const currentUser = await shopModel.findById(decodedToken.userId)
    if (!currentUser) {
      return next(new ApiError('The user belonging to this token does no longer exist.', StatusCodes.UNAUTHORIZED))
    }
    req.user = utils.pickData(currentUser, ['_id', 'name', 'email', 'status'])
    next()
  } catch (error) {
    if (error.message.includes('jwt expired')) {
      return next(new ApiError('Access Token has expired!', StatusCodes.GONE))
    }
    return next(new ApiError('Unauthorized User!', StatusCodes.UNAUTHORIZED))
  }
}
