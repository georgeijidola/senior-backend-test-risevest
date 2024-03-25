"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByUserController = void 0;
const async_1 = require("../../middlewares/async");
const constants_1 = require("../../../managers/constants");
const getPostsByUserService_1 = require("../../../services/getPostsByUserService");
const response_1 = require("../../../helpers/response");
const getPostsByUserController = (0, async_1.asyncHandler)(async (req, res) => {
    const userId = req.params.id;
    const posts = await (0, getPostsByUserService_1.getPostsByUserService)(userId);
    return res.status(constants_1.statusCodes.SUCCESS).json(new response_1.ApiResponse({
        data: posts
    }));
});
exports.getPostsByUserController = getPostsByUserController;
