import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { getUsersService } from '../../../services/getUsersService'
import { statusCodes } from '../../../managers/constants'
import { ApiResponse } from '../../../helpers/response'

const getUsersController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const users = await getUsersService()

    return res
      .status(statusCodes.SUCCESS)
      .json(new ApiResponse({ data: users }))
  }
)

export { getUsersController }
