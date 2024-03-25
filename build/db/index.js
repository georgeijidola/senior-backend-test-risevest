"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDatabase = exports.createDatabase = exports.migrator = exports.connectDatabase = void 0;
const config_1 = require("../config");
const pg_1 = __importStar(require("pg"));
const umzug_1 = require("umzug");
const findDatabase_1 = require("../src/helpers/findDatabase");
const dbConnection_1 = require("../src/loaders/dbConnection");
const fs_1 = require("fs");
const logger_1 = require("../src/loaders/logger");
const { host, port, user, name, password } = config_1.config.database;
const connectDatabase = async () => {
    const client = new pg_1.default.Client({
        host,
        port,
        database: name,
        user,
        password
    });
    await client.connect();
    return client;
};
exports.connectDatabase = connectDatabase;
const getRawSqlClient = () => {
    return {
        query: async (sql) => dbConnection_1.sequelize.query(sql)
    };
};
const migrate = async (path) => {
    const sql = (0, fs_1.readFileSync)(path).toString();
    return dbConnection_1.sequelize.query(sql);
};
const migrator = new umzug_1.Umzug({
    migrations: {
        glob: 'db/migrations/*.up.sql',
        resolve: ({ name, path }) => ({
            name,
            up: async () => await migrate(path),
            down: async () => await migrate(path.replace('.up.sql', '.down.sql'))
        })
    },
    context: getRawSqlClient(),
    storage: new umzug_1.SequelizeStorage({
        sequelize: dbConnection_1.sequelize,
        modelName: 'MigrationMeta',
        tableName: 'migrations_meta'
    }),
    logger: console
});
exports.migrator = migrator;
const createDatabase = async () => {
    try {
        const pool = new pg_1.Pool({
            host,
            user,
            password
        });
        const result = await (0, findDatabase_1.findDatabase)(pool, name);
        if (result.rowCount === 0) {
            await pool.query(`CREATE DATABASE ${name};`);
            logger_1.logger.info(`Created database ${name}.`);
        }
        else {
            logger_1.logger.info('Database already exists.');
        }
        return pool;
    }
    catch (error) {
        throw error;
    }
};
exports.createDatabase = createDatabase;
const dropDatabase = async () => {
    try {
        const pool = new pg_1.Pool({
            host,
            user,
            password
        });
        const result = await (0, findDatabase_1.findDatabase)(pool, name);
        if (result.rowCount === 0) {
            logger_1.logger.info(`Database ${name} doesn't exist.`);
        }
        else {
            await pool.query(`DROP DATABASE IF EXISTS ${name};`);
            logger_1.logger.info(`Dropped database ${name}.`);
        }
        return pool;
    }
    catch (error) {
        throw error;
    }
};
exports.dropDatabase = dropDatabase;
