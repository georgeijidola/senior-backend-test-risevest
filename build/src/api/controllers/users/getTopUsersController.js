"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopUsersController = void 0;
const async_1 = require("../../middlewares/async");
const getTopUsersService_1 = require("../../../services/getTopUsersService");
const constants_1 = require("../../../managers/constants");
const response_1 = require("../../../helpers/response");
const getTopUsersController = (0, async_1.asyncHandler)(async (req, res) => {
    const users = await (0, getTopUsersService_1.getTopUsersService)();
    return res
        .status(constants_1.statusCodes.SUCCESS)
        .json(new response_1.ApiResponse({ data: users }));
});
exports.getTopUsersController = getTopUsersController;
