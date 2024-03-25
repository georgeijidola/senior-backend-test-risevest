"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostController = void 0;
const async_1 = require("../../middlewares/async");
const constants_1 = require("../../../managers/constants");
const response_1 = require("../../../helpers/response");
const getPostService_1 = require("../../../services/getPostService");
const getPostController = (0, async_1.asyncHandler)(async (req, res) => {
    const postId = req.params.id;
    const post = await (0, getPostService_1.getPostService)(postId);
    return res.status(constants_1.statusCodes.SUCCESS).json(new response_1.ApiResponse({
        data: post
    }));
});
exports.getPostController = getPostController;
