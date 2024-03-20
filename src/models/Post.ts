import { DataTypes } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'
import { User } from './User'

const { UUID, UUIDV4, STRING, TEXT, DATE, NOW } = DataTypes

const Post = sequelize.define(
  'Post',
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
      defaultValue: NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW,
      field: 'updated_at'
    }
  },
  {
    tableName: 'Posts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

export { Post }
