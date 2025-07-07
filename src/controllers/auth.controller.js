import { StatusCodes } from 'http-status-codes'
import ApiSuccess from '~/helpers/ApiSuccess.helper'
import authService from '~/services/auth.service'

class AuthController {
  signUp = async (req, res, next) => {
    const metadata = await authService.signUp(req.body)
    new ApiSuccess({
      statusCode: StatusCodes.CREATED,
      metadata
    }).sendResponse(res)
  }

  login = async (req, res, next) => {
    const metadata = await authService.login(req.body)
    new ApiSuccess({
      statusCode: StatusCodes.OK,
      metadata
    }).sendResponse(res)
  }
}

export default new AuthController()
