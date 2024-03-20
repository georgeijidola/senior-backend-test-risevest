import { response } from '../../interfaces/response'

class ErrorResponse extends Error implements response {
  message
  statusCode: response['statusCode']
  data: response['data']
  token: response['token']
  pagination: response['pagination']

  public constructor({
    message = 'Internal Server error.',
    statusCode = 500,
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
