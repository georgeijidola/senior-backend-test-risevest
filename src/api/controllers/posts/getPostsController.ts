import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { getPostsService } from '../../../services/getPostsService'
import { statusCodes } from '../../../managers/constants'
import SuccessResponse from '../../../helpers/successResponse'

const getPostsController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const posts = await getPostsService()

    return res.status(statusCodes.SUCCESS).json(
      new SuccessResponse({
        data: posts
      })
    )
  }
)

export { getPostsController }
