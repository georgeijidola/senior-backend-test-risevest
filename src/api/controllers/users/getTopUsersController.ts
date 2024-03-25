import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { getTopUsersService } from '../../../services/getTopUsersService'
import { statusCodes } from '../../../managers/constants'
import { ApiResponse } from '../../../helpers/response'

const getTopUsersController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const users = await getTopUsersService()

    return res
      .status(statusCodes.SUCCESS)
      .json(new ApiResponse({ data: users }))
  }
)

export { getTopUsersController }
