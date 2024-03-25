import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { signInService } from '../../../services/signInService'
import { signToken } from '../../../helpers/auth/signToken'
import { ApiResponse } from '../../../helpers/response'
import { redisHandler } from '../../../managers/redis/index'
import { RedisNamespaces } from '../../../enums/RedisNamespaces'
import { statusCodes } from '../../../managers/constants'

const signInController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body

    const user = await signInService({ username, password })

    const token: string = signToken(user.id)

    const redis = await redisHandler()

    await redis.set({
      key: RedisNamespaces.AUTH_TOKEN + token,
      value: JSON.stringify({ id: user.id })
    })

    await redis.quit()

    return res
      .status(statusCodes.SUCCESS)
      .json(new ApiResponse({ data: user, token }))
  }
)

export { signInController }
