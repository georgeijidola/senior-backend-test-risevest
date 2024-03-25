"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInController = void 0;
const async_1 = require("../../middlewares/async");
const signInService_1 = require("../../../services/signInService");
const signToken_1 = require("../../../helpers/auth/signToken");
const response_1 = require("../../../helpers/response");
const index_1 = require("../../../managers/redis/index");
const RedisNamespaces_1 = require("../../../enums/RedisNamespaces");
const constants_1 = require("../../../managers/constants");
const signInController = (0, async_1.asyncHandler)(async (req, res) => {
    const { username, password } = req.body;
    const user = await (0, signInService_1.signInService)({ username, password });
    const token = (0, signToken_1.signToken)(user.id);
    const redis = await (0, index_1.redisHandler)();
    await redis.set({
        key: RedisNamespaces_1.RedisNamespaces.AUTH_TOKEN + token,
        value: JSON.stringify({ id: user.id })
    });
    await redis.quit();
    return res
        .status(constants_1.statusCodes.SUCCESS)
        .json(new response_1.ApiResponse({ data: user, token }));
});
exports.signInController = signInController;
