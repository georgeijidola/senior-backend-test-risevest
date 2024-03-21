import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'
import { User } from './User'
import { Post } from './Post'

class Comment extends Model {
  public id!: string
  public postId!: string
  public userId!: string
  public content!: string
  public createdAt!: Date
  public updatedAt!: Date
}

const { UUID, UUIDV4, TEXT, DATE, NOW } = DataTypes

Comment.init(
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
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

export { Comment }
