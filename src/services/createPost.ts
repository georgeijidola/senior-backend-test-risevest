import { Post, User } from '../models'
import { sequelize } from '../loaders/dbConnection'
import { logger } from '../loaders/logger'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import { statusCodes } from '../managers/constants'

const createPost = async (postData: {
  title: string
  content: string
  user_id: string
}): Promise<any> => {
  const { title, content, user_id } = postData

  let transaction

  try {
    transaction = await sequelize.transaction()

    const newPost = await Post.create(
      { title, content, user_id },
      { transaction }
    )

    await User.increment('postsCount', {
      by: 1,
      where: { id: user_id },
      transaction
    })

    await transaction.commit()

    return newPost
  } catch (error) {
    if (transaction) await transaction.rollback()

    logger.error(error)

    throw new ErrorResponse({
      message: 'Error creating post.',
      statusCode: statusCodes.UNPROCESSABLE_ENTITY
    })
  }
}

export { createPost }
