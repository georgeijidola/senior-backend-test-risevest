import { statusCodes } from '../managers/constants'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import { Post, User } from '../models'

const getPostsByUserService = async (userId: string) => {
  const user = await User.findByPk(userId, {
    attributes: ['id']
  })

  if (!user)
    throw new ErrorResponse({
      message: 'User not found.',
      statusCode: statusCodes.NOT_FOUND
    })

  const posts = await Post.findAll({
    where: { user_id: userId },
    attributes: ['id', 'title', 'content']
  })

  const formattedPosts = JSON.parse(JSON.stringify(posts, null, 2))

  return formattedPosts
}

export { getPostsByUserService }
