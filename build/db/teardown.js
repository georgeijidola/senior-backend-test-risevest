"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const logger_1 = require("../src/loaders/logger");
const teardown = async () => {
    try {
        await (0, _1.dropDatabase)();
        process.exit(0);
    }
    catch (error) {
        logger_1.logger.error('Database teardown failed:', error);
    }
};
teardown();
