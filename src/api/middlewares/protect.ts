import { NextFunction, Response } from 'express'
import asyncHandler from './async'
import DecipherToken from '../../helpers/auth/decipherToken'
import redisHandler from '../../managers/redis/Index'
import { RedisNamespaces } from '../../enums/RedisNamespaces'
import { User } from '../../models/User'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'
import { RequestWithUser } from '../../interfaces/requestWithUser'

// Protect routes
const protect = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const [userId, token] = await DecipherToken(
      (req.headers as any).authorization
    )

    const redis = await redisHandler()

    let user = (await redis.JSONGet(
      RedisNamespaces.AUTH_TOKEN + token
    )) as Partial<User> | null

    if (!user) {
      user = await User.findOne({
        where: { id: userId },
        attributes: ['id']
      })

      if (!user) {
        throw new ErrorResponse({
          statusCode: statusCodes.UNAUTHORISED,
          message: 'Unauthorized access.'
        })
      }
    }

    req.user = user

    await redis.quit()

    next()
  }
)

export default protect
