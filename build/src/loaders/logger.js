"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
// Conditional assignment for transports
const transports = process.env.NODE_ENV && process.env.NODE_ENV.includes('test')
    ? new winston_1.default.transports.Console()
    : new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat())
    });
const { combine, timestamp, errors, splat, json, prettyPrint, colorize } = winston_1.default.format;
// Logger configuration
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    levels: winston_1.default.config.npm.levels,
    format: combine(
    // Define log format
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), splat(), json(), prettyPrint(), colorize()),
    transports
});
exports.logger = logger;
