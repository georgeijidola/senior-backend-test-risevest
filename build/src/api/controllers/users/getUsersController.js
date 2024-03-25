"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = void 0;
const async_1 = require("../../middlewares/async");
const getUsersService_1 = require("../../../services/getUsersService");
const constants_1 = require("../../../managers/constants");
const response_1 = require("../../../helpers/response");
const getUsersController = (0, async_1.asyncHandler)(async (req, res) => {
    const users = await (0, getUsersService_1.getUsersService)();
    return res
        .status(constants_1.statusCodes.SUCCESS)
        .json(new response_1.ApiResponse({ data: users }));
});
exports.getUsersController = getUsersController;
