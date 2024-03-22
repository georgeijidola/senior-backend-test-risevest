import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'

class Comment extends Model {
  declare id: string
  declare postId: string
  declare userId: string
  declare content: string
  declare createdAt: Date
  declare updatedAt: Date
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default Comment
