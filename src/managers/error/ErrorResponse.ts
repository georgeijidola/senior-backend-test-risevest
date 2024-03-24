import { Response } from '../../interfaces/response'
import { statusCodes } from '../constants'

class ErrorResponse extends Error implements Response {
  message
  statusCode: Response['statusCode']
  data: Response['data']
  token: Response['token']

  public constructor({
    message = 'Internal Server error.',
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    data = {},
    token
  }: Partial<Response>) {
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.data = data
    this.token = token
  }
}

export { ErrorResponse }
