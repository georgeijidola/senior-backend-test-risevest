"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const loaders_1 = require("./loaders");
const logger_1 = require("./loaders/logger");
const startServer = async () => {
    const app = await (0, loaders_1.loaders)();
    const { port } = config_1.config.api;
    app
        .listen(port, () => {
        logger_1.logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################
    `);
    })
        .on('error', (error) => {
        logger_1.logger.error('Error starting server:', error);
        process.exitCode = 1;
    });
};
startServer();
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger_1.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
// Handle unhandled promise rejections
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception:', error);
    process.exitCode = 1;
});
