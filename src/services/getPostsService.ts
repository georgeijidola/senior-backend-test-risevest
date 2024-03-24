import { Post, User } from '../models'

const getPostsService = async (): Promise<Post[]> => {
  const posts = await Post.findAll({
    include: [{ model: User, as: 'user', attributes: ['username'] }],
    attributes: ['id', 'title', 'content']
  })

  const formattedPosts = JSON.parse(JSON.stringify(posts, null, 2))

  return formattedPosts
}

export { getPostsService }
