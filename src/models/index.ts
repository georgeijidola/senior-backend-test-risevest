import Comment from './Comment'
import Post from './Post'
import User from './User'

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  as: 'comments'
})

Post.belongsTo(User, {
  as: 'user'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  as: 'comments'
})

Comment.belongsTo(Post)

Comment.belongsTo(User)

export { User, Post, Comment }
