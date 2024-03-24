import { Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { RequestWithUser } from '../../../interfaces/requestWithUser'
import { statusCodes } from '../../../managers/constants'
import { ErrorResponse } from '../../../managers/error/ErrorResponse'
import { getPostsByUserService } from '../../../services/getPostsByUserService'
import SuccessResponse from '../../../helpers/successResponse'

const getPostsByUserController = asyncHandler(
  async (req: RequestWithUser, res: Response): Promise<any> => {
    const userId = req.params.id

    if (!userId)
      throw new ErrorResponse({
        message: 'User id is required.',
        statusCode: statusCodes.UNPROCESSABLE_ENTITY
      })

    const posts = await getPostsByUserService(userId)

    return res.status(statusCodes.SUCCESS).json(
      new SuccessResponse({
        data: posts
      })
    )
  }
)

export { getPostsByUserController }
