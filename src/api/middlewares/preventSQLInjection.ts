// Logic inspired by: https://github.com/vymarkov/sql-injection/blob/master/lib/index.js
import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'

const hasSql = (value: string) => {
  // sql regex reference: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks

  const sqlRegex = [
    /(%27)|(')|(--)|(%23)|(#)/gi, // SQL meta-characters
    /((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))/gi, // Modified SQL meta-characters
    /((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/gi, // Typical SQL injection attack
    /((''|[^'])*')|(\)\;)|(--)|(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|VERSION|ORDER|UNION( +ALL){0,1})/gi // SQL keywords
  ]

  // Check if the value matches any SQL injection pattern
  return sqlRegex.some((regex) => regex.test(value))
}

const { FORBIDDEN } = statusCodes

const preventSQLInjection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (hasSql(req.originalUrl) || hasSql(JSON.stringify(req.body)))
    throw new ErrorResponse({
      message: 'Dirty request!',
      statusCode: FORBIDDEN
    })

  next()
}

export { preventSQLInjection }
