class ApiResponse {
  message?: string
  statusCode?: number
  data?: object | object[]
  token?: string

  constructor({ message, statusCode, data, token }: ApiResponse) {
    this.message = message
    this.statusCode = statusCode
    this.data = data
    this.token = token
  }
}

export { ApiResponse }
