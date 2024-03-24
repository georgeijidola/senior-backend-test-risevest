import { statusCodes } from '../managers/constants'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import { Comment, Post, User } from '../models'

const getPostService = async (postId: string): Promise<Post> => {
  const post = await Post.findByPk(postId, {
    include: [
      { model: User, as: 'user', attributes: ['username'] },
      {
        model: Comment,
        as: 'comments',
        attributes: ['content'],
        include: [{ model: User, as: 'user', attributes: ['username'] }]
      }
    ],
    attributes: ['title', 'content']
  })

  if (!post)
    throw new ErrorResponse({
      message: 'Post not found.',
      statusCode: statusCodes.NOT_FOUND
    })

  return post.toJSON()
}

export { getPostService }
