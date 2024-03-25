"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInService = void 0;
const password_1 = __importDefault(require("../helpers/password"));
const constants_1 = require("../managers/constants");
const ErrorResponse_1 = require("../managers/error/ErrorResponse");
const models_1 = require("../models");
const signInService = async ({ username, password }) => {
    const { NOT_FOUND, BAD_REQUEST } = constants_1.statusCodes;
    const user = await models_1.User.findOne({
        where: {
            username
        },
        attributes: ['id', 'password', 'username']
    });
    if (!user) {
        throw new ErrorResponse_1.ErrorResponse({
            message: "Username doesn't exist.",
            statusCode: NOT_FOUND
        });
    }
    const passwordsMatch = password_1.default.compare(user.password, password);
    if (!passwordsMatch) {
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Username or password is incorrect.',
            statusCode: BAD_REQUEST
        });
    }
    delete user.password;
    return user;
};
exports.signInService = signInService;
