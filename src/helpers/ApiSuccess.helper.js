import { StatusCodes } from 'http-status-codes'

class ApiSuccess {
  constructor({ statusCode = StatusCodes.OK, metadata = {} }) {
    this.statusCode = statusCode
    this.metadata = metadata
  }

  sendResponse(res) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      metadata: {
        ...this.metadata
      }
    })
  }
}

export default ApiSuccess
