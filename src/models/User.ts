import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../loaders/dbConnection'
import Password from '../helpers/password'
import Comment from './Comment'
import zxcvbn from 'zxcvbn'
import { ErrorResponse } from '../managers/error/ErrorResponse'
import { statusCodes } from '../managers/constants'

const { UUID, UUIDV4, STRING, INTEGER, DATE, NOW } = DataTypes

class User extends Model {
  declare id: string
  declare username: string
  declare comments?: Comment[]
  declare latestComment?: Partial<Comment>
  declare postsCount: number
  declare createdAt: Date
  declare updatedAt: Date
  declare password?: string
}

User.init(
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
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

User.beforeCreate(async (user, options) => {
  const password = user.password!

  const { score, feedback } = zxcvbn(password)

  if (score < 2) {
    throw new ErrorResponse({
      message: 'Password is too weak. Please choose a stronger password.',
      statusCode: statusCodes.UNPROCESSABLE_ENTITY,
      data: feedback.suggestions
    })
  }

  const hashedPassword = Password.toHash(password)

  user.password = hashedPassword
})

export default User
