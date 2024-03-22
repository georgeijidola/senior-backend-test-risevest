import { Comment, User } from '../models'

const getTopUsers = async () => {
  const topUsers = await User.findAll({
    attributes: ['id', 'username', 'postsCount'],
    order: [['postsCount', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content'],
        limit: 1,
        order: [['createdAt', 'DESC']],
        as: 'comments'
      }
    ],
    limit: 3
  })

  const formattedTopUsers = topUsers.map((topUser) => {
    topUser = topUser.toJSON()

    const latestComment = topUser.comments![0]

    delete topUser.comments

    return {
      ...topUser,
      latestComment
    }
  })

  return formattedTopUsers
}

export { getTopUsers }
