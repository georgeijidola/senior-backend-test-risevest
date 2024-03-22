import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'
import User from './User'
import Comment from './Comment'

const { UUID, UUIDV4, STRING, TEXT, DATE, NOW } = DataTypes

class Post extends Model {
  declare id: string
  declare title: string
  declare content: string
  declare user: Partial<User>
  declare comments: Partial<Comment>
  declare createdAt: Date
  declare updatedAt: Date
}

Post.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    title: {
      type: STRING(255),
      allowNull: false
    },
    content: {
      type: TEXT,
      allowNull: false
    },
    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    }
  },
  {
    sequelize,
    modelName: 'Post',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Post
