import { DataTypes } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'

const { UUID, UUIDV4, STRING, INTEGER, DATE, NOW } = DataTypes

// Define the User model using sequelize.define
const User = sequelize.define(
  'User',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: STRING(255),
      allowNull: false,
      unique: true
    },
    postsCount: {
      type: INTEGER,
      defaultValue: 0
    },
    createdAt: {
      type: DATE,
      defaultValue: NOW
    },
    updatedAt: {
      type: DATE,
      defaultValue: NOW
    },
    password: {
      type: STRING(255),
      allowNull: false
    }
  },
  {
    tableName: 'Users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export { User }
