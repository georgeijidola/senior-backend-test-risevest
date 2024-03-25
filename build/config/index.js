"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorResponse_1 = require("../src/managers/error/ErrorResponse");
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotenv_1.default.config();
const requiredKeys = [
    'PORT',
    'INTERFACE',
    'NODE_ENV',
    'DB_HOST',
    'DB_DATABASE',
    'DB_TEST_DATABASE',
    'DB_USER',
    'DB_PASSWORD',
    'DB_PORT',
    'REDIS_HOST',
    'REDIS_PORT',
    'JWT_SECRET',
    'JWT_SECRET_EXPIRE',
    'LOG_LEVEL'
];
const missingKeys = requiredKeys.filter((key) => !key);
if (missingKeys.length) {
    const message = `${missingKeys.join(', ')} are missing and must be defined.`;
    throw new ErrorResponse_1.ErrorResponse({ message });
}
const { PORT, INTERFACE, NODE_ENV, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, DB_TEST_DATABASE, REDIS_PORT, REDIS_HOST, JWT_SECRET, JWT_SECRET_EXPIRE, LOG_LEVEL } = process.env;
const config = {
    api: {
        prefix: '/api/',
        port: parseInt(PORT, 10),
        httpInterface: INTERFACE
    },
    environment: NODE_ENV,
    database: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: parseInt(DB_PORT, 10),
        name: NODE_ENV === 'test' ? DB_TEST_DATABASE : DB_DATABASE
    },
    redis: {
        port: parseInt(REDIS_PORT, 10),
        host: REDIS_HOST
    },
    jwt: {
        secret: JWT_SECRET,
        secretExpire: JWT_SECRET_EXPIRE
    },
    logs: {
        level: LOG_LEVEL
    }
};
exports.config = config;
