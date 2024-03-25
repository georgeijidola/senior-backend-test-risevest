"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostService = void 0;
const constants_1 = require("../managers/constants");
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const models_1 = require("../models");
const getPostService = async (postId) => {
    const post = await models_1.Post.findByPk(postId, {
        include: [
            { model: models_1.User, as: 'user', attributes: ['username'] },
            {
                model: models_1.Comment,
                as: 'comments',
                attributes: ['content'],
                include: [{ model: models_1.User, as: 'user', attributes: ['username'] }]
            }
        ],
        attributes: ['title', 'content']
    });
    if (!post)
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Post not found.',
            statusCode: constants_1.statusCodes.NOT_FOUND
        });
    return post.toJSON();
};
exports.getPostService = getPostService;
