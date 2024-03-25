import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { getPostsService } from '../../../services/getPostsService'
import { statusCodes } from '../../../managers/constants'
import { ApiResponse } from '../../../helpers/response'

const getPostsController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const posts = await getPostsService()

    return res.status(statusCodes.SUCCESS).json(
      new ApiResponse({
        data: posts
      })
    )
  }
)

export { getPostsController }
