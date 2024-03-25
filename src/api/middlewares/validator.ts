import { Request, Response, NextFunction } from 'express'
import Ajv, { ValidateFunction } from 'ajv'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'

interface Schema {
  [key: string]: any
}

const ajv = new Ajv()

const validator = (schema: Schema) => {
  const validateData: ValidateFunction = ajv.compile(schema)

  return (req: Request, res: Response, next: NextFunction) => {
    const isValid = validateData(req.body)

    if (!isValid) {
      const { instancePath, message } = validateData.errors![0]

      throw new ErrorResponse({
        // Only an error per request
        message: `${
          instancePath.charAt(1).toUpperCase() + instancePath.substring(2)
        } ${message}`,
        statusCode: statusCodes.UNPROCESSABLE_ENTITY
      })
    }

    next()
  }
}

export { validator }
