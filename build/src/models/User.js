"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../loaders/dbConnection");
const password_1 = __importDefault(require("../helpers/password"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const constants_1 = require("../managers/constants");
const { UUID, UUIDV4, STRING, INTEGER, DATE, NOW } = sequelize_1.DataTypes;
class User extends sequelize_1.Model {
}
User.init({
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
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
User.beforeCreate(async (user, options) => {
    const password = user.password;
    const { score, feedback } = (0, zxcvbn_1.default)(password);
    if (score < 2) {
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Password is too weak. Please choose a stronger password.',
            statusCode: constants_1.statusCodes.UNPROCESSABLE_ENTITY,
            data: feedback.suggestions
        });
    }
    const hashedPassword = password_1.default.toHash(password);
    user.password = hashedPassword;
});
exports.default = User;
