import { response } from '../../interfaces/response'
import { statusCodes } from '../constants'

class ErrorResponse extends Error implements response {
  message
  statusCode: response['statusCode']
  data: response['data']
  token: response['token']
  pagination: response['pagination']

  public constructor({
    message = 'Internal Server error.',
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    data = {},
    token,
    pagination
  }: Partial<response>) {
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.data = data
    this.token = token
    this.pagination = pagination
  }
}

export { ErrorResponse }
