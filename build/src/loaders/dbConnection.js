"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
const { host, port, user, password, name } = config_1.config.database;
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host,
    port,
    username: user,
    password,
    database: name,
    logging: false,
    define: {
        underscored: true
    }
});
exports.sequelize = sequelize;
