"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../loaders/dbConnection");
const { UUID, UUIDV4, STRING, TEXT, DATE, NOW } = sequelize_1.DataTypes;
class Post extends sequelize_1.Model {
}
Post.init({
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
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: 'Post',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = Post;
