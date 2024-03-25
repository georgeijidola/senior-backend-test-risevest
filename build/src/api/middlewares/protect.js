"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const decipherToken_1 = __importDefault(require("../../helpers/auth/decipherToken"));
const RedisNamespaces_1 = require("../../enums/RedisNamespaces");
const ErrorResponse_1 = require("../../managers/error/ErrorResponse");
const constants_1 = require("../../managers/constants");
const async_1 = require("./async");
const models_1 = require("../../models");
const index_1 = require("../../managers/redis/index");
const protect = (0, async_1.asyncHandler)(async (req, res, next) => {
    const [userId, token] = await (0, decipherToken_1.default)(req.headers.authorization);
    const redis = await (0, index_1.redisHandler)();
    const cacheUser = await redis.get(RedisNamespaces_1.RedisNamespaces.AUTH_TOKEN + token);
    if (cacheUser) {
        req.user = JSON.parse(cacheUser);
    }
    else {
        const user = await models_1.User.findByPk(userId, {
            attributes: ['id']
        });
        if (!user) {
            throw new ErrorResponse_1.ErrorResponse({
                statusCode: constants_1.statusCodes.UNAUTHORISED,
                message: 'Unauthorized access.'
            });
        }
        req.user = user.toJSON();
    }
    await redis.quit();
    next();
});
exports.protect = protect;
