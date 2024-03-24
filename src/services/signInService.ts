import signToken from '../helpers/auth/signToken'
import Password from '../helpers/password'
import { statusCodes } from '../managers/constants'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import { User } from '../models'

const signInService = async ({
  username,
  password
}: {
  username: string
  password: string
}): Promise<any> => {
  const { NOT_FOUND, BAD_REQUEST } = statusCodes

  const user = await User.findOne({
    where: {
      username
    },
    attributes: ['id', 'password', 'username']
  })

  if (!user) {
    throw new ErrorResponse({
      message: "Username doesn't exist.",
      statusCode: NOT_FOUND
    })
  }

  const passwordsMatch = Password.compare(user.password!, password)

  if (!passwordsMatch) {
    throw new ErrorResponse({
      message: 'Username or password is incorrect.',
      statusCode: BAD_REQUEST
    })
  }

  delete user.password

  return user
}

export { signInService }
