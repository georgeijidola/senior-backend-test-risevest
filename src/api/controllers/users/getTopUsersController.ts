import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { getTopUsersService } from '../../../services/getTopUsersService'
import { statusCodes } from '../../../managers/constants'
import SuccessResponse from '../../../helpers/successResponse'

const getTopUsersController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const users = await getTopUsersService()

    return res
      .status(statusCodes.SUCCESS)
      .json(new SuccessResponse({ data: users }))
  }
)

export { getTopUsersController }
