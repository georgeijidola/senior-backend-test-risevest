"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByUserService = void 0;
const constants_1 = require("../managers/constants");
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const models_1 = require("../models");
const getPostsByUserService = async (userId) => {
    const user = await models_1.User.findByPk(userId, {
        attributes: ['id']
    });
    if (!user)
        throw new ErrorResponse_1.ErrorResponse({
            message: 'User not found.',
            statusCode: constants_1.statusCodes.NOT_FOUND
        });
    const posts = await models_1.Post.findAll({
        where: { user_id: userId },
        attributes: ['id', 'title', 'content']
    });
    const formattedPosts = JSON.parse(JSON.stringify(posts, null, 2));
    return formattedPosts;
};
exports.getPostsByUserService = getPostsByUserService;
