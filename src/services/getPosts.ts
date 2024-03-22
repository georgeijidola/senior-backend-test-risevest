import { Post, User } from '../models'

const getPosts = async (): Promise<Post[]> => {
  const posts = await Post.findAll({
    include: [
      { model: User, as: 'user', attributes: ['username'] }
      //   {
      //     model: Comment,
      //     as: 'comments',
      //     attributes: ['content'],
      //     include: [{ model: User, as: 'user', attributes: ['username'] }]
      //   }
    ],
    attributes: ['title', 'content']
  })

  const formattedPosts = JSON.parse(JSON.stringify(posts, null, 2))

  return formattedPosts
}

export { getPosts }
