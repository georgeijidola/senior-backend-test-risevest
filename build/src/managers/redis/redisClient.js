"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const config_1 = require("../../../config");
const logger_1 = require("../../loaders/logger");
const { port, host } = config_1.config.redis;
const redisClient = async () => {
    const client = (0, redis_1.createClient)({
        url: `redis://${host}:${port}`
    });
    client.on('error', (error) => {
        logger_1.logger.error(`Redis client error: ${error}`);
    });
    await client.connect();
    return client;
};
exports.redisClient = redisClient;
