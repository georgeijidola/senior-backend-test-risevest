import { Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { RequestWithUser } from '../../../interfaces/requestWithUser'
import { createPostService } from '../../../services/createPostService'
import { statusCodes } from '../../../managers/constants'
import { ErrorResponse } from '../../../managers/error/ErrorResponse'
import { ApiResponse } from '../../../helpers/response'

const createPostController = asyncHandler(
  async (req: RequestWithUser, res: Response): Promise<any> => {
    const user_id = req.user.id

    if (req.params.id !== req.user.id)
      throw new ErrorResponse({
        message: 'Invalid user id',
        statusCode: statusCodes.UNPROCESSABLE_ENTITY
      })

    const { title, content } = req.body

    const newPost = await createPostService({ title, content, user_id })

    return res.status(statusCodes.CREATED).json(
      new ApiResponse({
        message: 'Post created successfully',
        data: newPost
      })
    )
  }
)

export { createPostController }
