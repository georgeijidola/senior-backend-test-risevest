"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopUsersService = void 0;
const models_1 = require("../models");
const getTopUsersService = async () => {
    const topUsers = await models_1.User.findAll({
        attributes: ['id', 'username', 'postsCount'],
        order: [['postsCount', 'DESC']],
        include: [
            {
                model: models_1.Comment,
                attributes: ['id', 'content'],
                limit: 1,
                order: [['createdAt', 'DESC']],
                as: 'comments'
            }
        ],
        limit: 3
    });
    const formattedTopUsers = topUsers.map((topUser) => {
        topUser = topUser.toJSON();
        const latestComment = topUser.comments[0];
        delete topUser.comments;
        return {
            ...topUser,
            latestComment
        };
    });
    return formattedTopUsers;
};
exports.getTopUsersService = getTopUsersService;
