"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaders = void 0;
const dbConnection_1 = require("./dbConnection");
const express_1 = require("./express");
const logger_1 = require("./logger");
const loaders = async () => {
    try {
        await dbConnection_1.sequelize.authenticate();
        logger_1.logger.info('Sequelize connection to the database is authenticated.');
    }
    catch (error) {
        logger_1.logger.error('Unable to authenticate to the database:', error);
    }
    logger_1.logger.info('✌️ Express loaded');
    return express_1.app;
};
exports.loaders = loaders;
