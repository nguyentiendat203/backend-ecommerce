import { StatusCodes } from 'http-status-codes'
import { MODE_ENV } from '~/configs/env.config'

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  }
  if (MODE_ENV !== 'dev') delete responseError.stack

  res.status(responseError.statusCode).json(responseError)
}
