import { Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { RequestWithUser } from '../../../interfaces/requestWithUser'
import { addCommentService } from '../../../services/addCommentService'
import { statusCodes } from '../../../managers/constants'
import { ApiResponse } from '../../../helpers/response'

const addCommentController = asyncHandler(
  async (req: RequestWithUser, res: Response): Promise<any> => {
    const { content } = req.body

    const userId = req.user.id
    const postId = req.params.id

    const comment = await addCommentService({ postId, userId, content })

    return res.status(statusCodes.CREATED).json(
      new ApiResponse({
        message: 'Comment added successfully',
        data: comment
      })
    )
  }
)

export { addCommentController }
