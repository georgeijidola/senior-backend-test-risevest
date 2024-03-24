import { NextFunction, Response } from 'express'
import DecipherToken from '../../helpers/auth/decipherToken'
import { RedisNamespaces } from '../../enums/RedisNamespaces'
import { ErrorResponse } from '../../managers/error/ErrorResponse'
import { statusCodes } from '../../managers/constants'
import { RequestWithUser } from '../../interfaces/requestWithUser'
import { asyncHandler } from './async'
import { User } from '../../models'
import { redisHandler } from '../../managers/redis/index'

const protect = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const [userId, token] = await DecipherToken(
      (req.headers as any).authorization
    )

    const redis = await redisHandler()

    const cacheUser = await redis.get(RedisNamespaces.AUTH_TOKEN + token)

    if (cacheUser) {
      req.user = JSON.parse(cacheUser)
    } else {
      const user = await User.findByPk(userId, {
        attributes: ['id']
      })

      if (!user) {
        throw new ErrorResponse({
          statusCode: statusCodes.UNAUTHORISED,
          message: 'Unauthorized access.'
        })
      }

      req.user = user.toJSON()
    }

    await redis.quit()

    next()
  }
)

export { protect }
