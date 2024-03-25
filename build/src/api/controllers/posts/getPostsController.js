"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsController = void 0;
const async_1 = require("../../middlewares/async");
const getPostsService_1 = require("../../../services/getPostsService");
const constants_1 = require("../../../managers/constants");
const response_1 = require("../../../helpers/response");
const getPostsController = (0, async_1.asyncHandler)(async (req, res) => {
    const posts = await (0, getPostsService_1.getPostsService)();
    return res.status(constants_1.statusCodes.SUCCESS).json(new response_1.ApiResponse({
        data: posts
    }));
});
exports.getPostsController = getPostsController;
