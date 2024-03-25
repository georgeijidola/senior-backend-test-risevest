import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { statusCodes } from '../../../managers/constants'
import { ApiResponse } from '../../../helpers/response'
import { ErrorResponse } from '../../../managers/error/ErrorResponse'
import { getPostService } from '../../../services/getPostService'

const getPostController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const postId = req.params.id

    const post = await getPostService(postId)

    return res.status(statusCodes.SUCCESS).json(
      new ApiResponse({
        data: post
      })
    )
  }
)

export { getPostController }
