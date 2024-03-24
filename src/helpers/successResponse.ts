import { Response } from '../interfaces/response'

class SuccessResponse extends Response {
  public constructor({ message = '', data = {}, token }: Response) {
    super({ message, data, token })

    this.data = data
    this.message = message
    this.token = token
  }
}

export default SuccessResponse
