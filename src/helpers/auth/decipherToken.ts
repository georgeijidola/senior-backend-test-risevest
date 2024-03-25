import jwt from 'jsonwebtoken'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'
import { config } from '../../../config'

const DecipherToken = async (token?: string) => {
  if (!token || !token.startsWith('Bearer')) {
    throw new ErrorResponse({
      message: 'Bearer token is missing.',
      statusCode: statusCodes.UNAUTHORISED
    })
  }

  token = token.split(' ')[1]

  const decoded = jwt.verify(token, config.jwt.secret) as { text: string }

  return [decoded.text, token]
}

export default DecipherToken
