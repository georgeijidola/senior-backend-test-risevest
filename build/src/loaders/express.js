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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const errorHandler_1 = __importDefault(require("../managers/error/errorHandler"));
const preventSQLInjection_1 = require("../api/middlewares/preventSQLInjection");
const api_1 = __importDefault(require("../api"));
const config_1 = require("../../config");
const constants_1 = require("../managers/constants");
const { SUCCESS, NOT_FOUND } = constants_1.statusCodes;
const { prefix } = config_1.config.api;
const app = (0, express_1.default)();
exports.app = app;
// Trust proxy
app.set('trust proxy', 1);
// Enable CORS
app.use((0, cors_1.default)());
// Parse JSON request bodies
app.use((0, express_1.json)());
// Sanitize data to prevent SQL injection
app.use(preventSQLInjection_1.preventSQLInjection);
// Set security headers
app.use((0, helmet_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 30
});
app.use(limiter);
// Prevent HTTP Parameter Pollution
app.use((0, hpp_1.default)());
// Health Check
app.get('/', (req, res) => {
    res.status(SUCCESS).send('Welcome to Risevest Assessment API!');
});
// Health Check endpoint
app.get('/status', (req, res) => {
    res.status(SUCCESS).end();
});
// API routes
app.use(prefix, api_1.default);
// Handle 404 errors
app.use('*', (req, res) => {
    throw new ErrorResponse_1.ErrorResponse({
        message: 'Resource not found.',
        statusCode: NOT_FOUND
    });
});
// Error handling middleware
app.use((error, req, res, next) => {
    const formattedError = (0, errorHandler_1.default)(error);
    res.status(formattedError.statusCode).json(formattedError);
});
