import { Request, Response } from 'express'
import { asyncHandler } from '../../middlewares/async'
import { signUpService } from '../../../services/signUpService'
import SuccessResponse from '../../../helpers/successResponse'
import { statusCodes } from '../../../managers/constants'

const signUpController = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body

    await signUpService({
      username,
      password
    })

    return res.status(statusCodes.CREATED).json(
      new SuccessResponse({
        message: 'User registered.'
      })
    )
  }
)

export { signUpController }
