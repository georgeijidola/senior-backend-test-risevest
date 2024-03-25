"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentController = void 0;
const async_1 = require("../../middlewares/async");
const addCommentService_1 = require("../../../services/addCommentService");
const constants_1 = require("../../../managers/constants");
const response_1 = require("../../../helpers/response");
const addCommentController = (0, async_1.asyncHandler)(async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    const postId = req.params.id;
    const comment = await (0, addCommentService_1.addCommentService)({ postId, userId, content });
    return res.status(constants_1.statusCodes.CREATED).json(new response_1.ApiResponse({
        message: 'Comment added successfully',
        data: comment
    }));
});
exports.addCommentController = addCommentController;
