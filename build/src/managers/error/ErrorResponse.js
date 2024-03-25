"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const constants_1 = require("../constants");
class ErrorResponse extends Error {
    message;
    statusCode;
    data;
    token;
    constructor({ message = 'Internal Server error.', statusCode = constants_1.statusCodes.INTERNAL_SERVER_ERROR, data = {}, token } = {}) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.token = token;
    }
}
exports.ErrorResponse = ErrorResponse;
