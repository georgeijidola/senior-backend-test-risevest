"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersService = void 0;
const models_1 = require("../models");
const getUsersService = async () => {
    const users = await models_1.User.findAll({
        attributes: ['id', 'username', 'postsCount']
    });
    const usersData = users.map((user) => user.toJSON());
    return usersData;
};
exports.getUsersService = getUsersService;
