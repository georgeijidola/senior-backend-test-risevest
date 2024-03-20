import { pagination } from './pagination'

class response {
  message?: string
  statusCode?: number
  data?: object | object[]
  token?: string
  pagination?: pagination

  constructor({ message, statusCode, data, token, pagination }: response) {
    this.message = message
    this.statusCode = statusCode
    this.data = data
    this.token = token
    this.pagination = pagination
  }
}

export { response }
