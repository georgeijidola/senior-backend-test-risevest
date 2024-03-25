"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsService = void 0;
const models_1 = require("../models");
const getPostsService = async () => {
    const posts = await models_1.Post.findAll({
        include: [{ model: models_1.User, as: 'user', attributes: ['username'] }],
        attributes: ['id', 'title', 'content']
    });
    const formattedPosts = JSON.parse(JSON.stringify(posts, null, 2));
    return formattedPosts;
};
exports.getPostsService = getPostsService;
