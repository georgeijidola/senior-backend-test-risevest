import { Request, Response, NextFunction } from 'express'
import Ajv, { ValidateFunction, ErrorObject } from 'ajv'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'

const ajv = new Ajv()

const validator = (options: { [key: string]: any }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const targets = ['body', 'params', 'query']

    targets.forEach((target) => {
      if (options[target]) {
        const validateData: ValidateFunction = ajv.compile(options[target])

        if (target === 'body' || target === 'params' || target === 'query') {
          const isValid = validateData(req[target])

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
        }
      }
    })

    next()
  }
}

export { validator }
