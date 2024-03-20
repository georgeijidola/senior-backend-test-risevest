import { config } from '../../../config'

const { internal_server_error, not_found } = config.errorCodes

interface ErrorInput {
  statusCode?: number
  message: string
}

class ErrorResponse extends Error {
  statusCode: number

  constructor({ statusCode, message = 'Internal Server Error' }: ErrorInput) {
    super(message)
    this.name = 'ErrorResponse'
    this.statusCode = statusCode || internal_server_error
  }

  static notFound(message: string = 'Not Found'): ErrorResponse {
    return new ErrorResponse({ statusCode: not_found, message })
  }
}

export { ErrorResponse }
