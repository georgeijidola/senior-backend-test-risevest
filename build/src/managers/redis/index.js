"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisHandler = void 0;
const redisClient_1 = require("./redisClient");
const redisHandler = async () => {
    const redis = await (0, redisClient_1.redisClient)();
    const expiry = 72 * 60 * 60;
    return {
        set: async ({ key, value, EX = expiry }) => await redis.set(key, value, {
            EX
        }),
        get: async (key) => await redis.get(key),
        del: async (key) => await redis.del(key),
        quit: async () => await redis.quit()
    };
};
exports.redisHandler = redisHandler;
