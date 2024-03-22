import { Post, User } from '../models'

const getPostsByUser = async (userId: string) => {
  const posts = await Post.findAll({
    where: { user_id: userId },
    attributes: ['title', 'content']
  })

  const formattedPosts = JSON.parse(JSON.stringify(posts, null, 2))

  return formattedPosts
}

export { getPostsByUser }
