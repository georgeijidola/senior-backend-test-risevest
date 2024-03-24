import { Comment, User } from '../models'
import { sequelize } from '../loaders/dbConnection'
import { logger } from '../loaders/logger'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import { statusCodes } from '../managers/constants'

const addCommentService = async (commentData: {
  postId: string
  userId: string
  content: string
}) => {
  const { postId, userId, content } = commentData

  let transaction

  try {
    transaction = await sequelize.transaction()

    const comment = await Comment.create(
      { postId, userId, content },
      { transaction }
    )

    await User.update(
      { latestComment: comment.id },
      { where: { id: userId }, transaction }
    )

    await transaction.commit()

    return comment
  } catch (error) {
    if (transaction) await transaction.rollback()

    logger.error(error)

    throw new ErrorResponse({
      message: 'Error creating post.',
      statusCode: statusCodes.UNPROCESSABLE_ENTITY
    })
  }
}

export { addCommentService }
