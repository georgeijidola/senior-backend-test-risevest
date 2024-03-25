"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../loaders/dbConnection");
class Comment extends sequelize_1.Model {
}
const { UUID, UUIDV4, TEXT, DATE, NOW } = sequelize_1.DataTypes;
Comment.init({
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
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: 'Comment',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = Comment;
