import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { getUsersService } from '../../../services/getUsersService'
import { statusCodes } from '../../../managers/constants'
import SuccessResponse from '../../../helpers/successResponse'

const getUsersController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const users = await getUsersService()

    return res
      .status(statusCodes.SUCCESS)
      .json(new SuccessResponse({ data: users }))
  }
)

export { getUsersController }
