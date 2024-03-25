"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostService = void 0;
const models_1 = require("../models");
const dbConnection_1 = require("../loaders/dbConnection");
const logger_1 = require("../loaders/logger");
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const constants_1 = require("../managers/constants");
const createPostService = async (postData) => {
    const { title, content, user_id } = postData;
    let transaction;
    try {
        transaction = await dbConnection_1.sequelize.transaction();
        const newPost = await models_1.Post.create({ title, content, user_id }, { transaction });
        await models_1.User.increment('postsCount', {
            by: 1,
            where: { id: user_id },
            transaction
        });
        await transaction.commit();
        return newPost;
    }
    catch (error) {
        if (transaction)
            await transaction.rollback();
        logger_1.logger.error(error);
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Error creating post.',
            statusCode: constants_1.statusCodes.UNPROCESSABLE_ENTITY
        });
    }
};
exports.createPostService = createPostService;
