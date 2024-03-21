import jwt from 'jsonwebtoken'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'
import { config } from '../../../config'

const DecipherToken = async (token?: string) => {
  // Make sure token exists
  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1]
  } else {
    throw new ErrorResponse({
      message: 'Bearer token is missing.',
      statusCode: statusCodes.UNAUTHORISED
    })
  }

  const decoded = jwt.verify(token!, config.jwt.secret) as {
    text: string
  }

  return [decoded.text, token]
}

export default DecipherToken
