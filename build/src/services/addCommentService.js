"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentService = void 0;
const models_1 = require("../models");
const dbConnection_1 = require("../loaders/dbConnection");
const logger_1 = require("../loaders/logger");
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const constants_1 = require("../managers/constants");
const addCommentService = async (commentData) => {
    const { postId, userId, content } = commentData;
    let transaction;
    try {
        transaction = await dbConnection_1.sequelize.transaction();
        const comment = await models_1.Comment.create({ postId, userId, content }, { transaction });
        await models_1.User.update({ latestComment: comment.id }, { where: { id: userId }, transaction });
        await transaction.commit();
        return comment;
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
exports.addCommentService = addCommentService;
