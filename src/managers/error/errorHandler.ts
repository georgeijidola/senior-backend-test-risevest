import { statusCodes } from '../constants'
import { ErrorResponse } from './ErrorResponse'

const errorHandler = (error: any): ErrorResponse => {
  const { FORBIDDEN, UNAUTHORISED, UNPROCESSABLE_ENTITY } = statusCodes

  // Log error in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error)
  }

  switch (error.name) {
    case 'SyntaxError':
      return new ErrorResponse({
        message: 'Something went wrong, please contact support.',
        statusCode: FORBIDDEN
      })

    case 'JsonWebTokenError':
      return new ErrorResponse({
        message: 'Not authorized to access this route',
        statusCode: UNAUTHORISED
      })

    case 'SequelizeValidationError':
      const validationError = error.errors[0]
      let errorMessage = validationError.message

      if (validationError.type.includes('notNull')) {
        const path =
          validationError.path.charAt(0).toUpperCase() +
          validationError.path.slice(1)

        errorMessage = `${path} is required.`
      }

      return new ErrorResponse({
        message: errorMessage,
        statusCode: UNPROCESSABLE_ENTITY
      })

    case 'SequelizeUniqueConstraintError':
      const uniqueConstraintError = error.errors[0]
      const uniquePath = uniqueConstraintError.path

      return new ErrorResponse({
        message: `${
          uniquePath.charAt(0).toUpperCase() + uniquePath.slice(1)
        } already exists.`,
        statusCode: UNPROCESSABLE_ENTITY
      })

    case 'TokenExpiredError':
      return new ErrorResponse({
        message: 'Session expired, please log in again.',
        statusCode: UNAUTHORISED
      })

    default:
      return error
  }
}

export default errorHandler
