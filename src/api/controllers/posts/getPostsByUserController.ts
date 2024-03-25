import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { statusCodes } from '../../../managers/constants'
import { ErrorResponse } from '../../../managers/error/ErrorResponse'
import { getPostsByUserService } from '../../../services/getPostsByUserService'
import SuccessResponse from '../../../helpers/successResponse'

const getPostsByUserController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userId = req.params.id

    const posts = await getPostsByUserService(userId)

    return res.status(statusCodes.SUCCESS).json(
      new SuccessResponse({
        data: posts
      })
    )
  }
)

export { getPostsByUserController }
