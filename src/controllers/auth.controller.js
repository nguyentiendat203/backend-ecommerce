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

  refreshNewAccessToken = async (req, res, next) => {
    const metadata = await authService.refreshNewAccessToken(req.headers.authorization.split(' ')[1])
    new ApiSuccess({
      statusCode: StatusCodes.OK,
      metadata
    }).sendResponse(res)
  }

  logout = async (req, res, next) => {
    new ApiSuccess({
      statusCode: StatusCodes.OK,
      metadata: await authService.logout(req.user)
    }).sendResponse(res)
  }
}

export default new AuthController()
