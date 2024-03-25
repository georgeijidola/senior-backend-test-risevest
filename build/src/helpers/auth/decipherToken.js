"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorResponse_1 = require("../../managers/error/ErrorResponse");
const constants_1 = require("../../managers/constants");
const config_1 = require("../../../config");
const DecipherToken = async (token) => {
    if (!token || !token.startsWith('Bearer')) {
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Bearer token is missing.',
            statusCode: constants_1.statusCodes.UNAUTHORISED
        });
    }
    token = token.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
    return [decoded.text, token];
};
exports.default = DecipherToken;
