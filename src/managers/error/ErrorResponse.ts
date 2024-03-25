import { ApiResponse } from '../../helpers/response'
import { statusCodes } from '../constants'

class ErrorResponse extends Error implements ApiResponse {
  readonly message: string
  readonly statusCode: number
  readonly data: any
  readonly token?: string

  constructor({
    message = 'Internal Server error.',
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    data = {},
    token
  }: Partial<ApiResponse> = {}) {
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.data = data
    this.token = token
  }
}

export { ErrorResponse }
