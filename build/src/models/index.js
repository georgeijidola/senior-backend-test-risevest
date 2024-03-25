"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Post = exports.User = void 0;
const Comment_1 = __importDefault(require("./Comment"));
exports.Comment = Comment_1.default;
const Post_1 = __importDefault(require("./Post"));
exports.Post = Post_1.default;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
User_1.default.hasMany(Post_1.default, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
User_1.default.hasMany(Comment_1.default, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as: 'comments'
});
Post_1.default.belongsTo(User_1.default, {
    as: 'user'
});
Post_1.default.hasMany(Comment_1.default, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    as: 'comments'
});
Comment_1.default.belongsTo(Post_1.default);
Comment_1.default.belongsTo(User_1.default, {
    as: 'user'
});
