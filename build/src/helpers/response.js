"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    message;
    statusCode;
    data;
    token;
    constructor({ message, statusCode, data, token }) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.token = token;
    }
}
exports.ApiResponse = ApiResponse;
