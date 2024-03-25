"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const logger_1 = require("../src/loaders/logger");
const migrate = async () => {
    try {
        const action = process.argv[2];
        if (!['up', 'down'].includes(action)) {
            logger_1.logger.info("Invalid migration argument. Please specify 'up' or 'down'.");
            process.exitCode = 1;
            return;
        }
        action === 'up' ? await _1.migrator.up() : await _1.migrator.down({ to: 0 });
        logger_1.logger.info('Migration done.');
        process.exitCode = 0;
    }
    catch (error) {
        logger_1.logger.error('Migration failed:', error);
        process.exitCode = 1;
    }
};
migrate();
