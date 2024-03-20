import { DataTypes } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'
import { User } from './User'
import { Post } from './Post'

const { UUID, UUIDV4, TEXT, DATE, NOW } = DataTypes

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    postId: {
      type: UUID,
      allowNull: false
    },
    userId: {
      type: UUID,
      allowNull: false
    },
    content: {
      type: TEXT,
      allowNull: false
    },
    createdAt: {
      type: DATE,
      defaultValue: NOW
    },
    updatedAt: {
      type: DATE,
      defaultValue: NOW
    }
  },
  {
    tableName: 'Comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

export { Comment }
