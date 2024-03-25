"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostController = void 0;
const async_1 = require("../../middlewares/async");
const createPostService_1 = require("../../../services/createPostService");
const constants_1 = require("../../../managers/constants");
const ErrorResponse_1 = require("../../../managers/error/ErrorResponse");
const response_1 = require("../../../helpers/response");
const createPostController = (0, async_1.asyncHandler)(async (req, res) => {
    const user_id = req.user.id;
    if (req.params.id !== req.user.id)
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Invalid user id',
            statusCode: constants_1.statusCodes.UNPROCESSABLE_ENTITY
        });
    const { title, content } = req.body;
    const newPost = await (0, createPostService_1.createPostService)({ title, content, user_id });
    return res.status(constants_1.statusCodes.CREATED).json(new response_1.ApiResponse({
        message: 'Post created successfully',
        data: newPost
    }));
});
exports.createPostController = createPostController;
