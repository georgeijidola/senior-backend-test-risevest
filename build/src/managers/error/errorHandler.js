"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const ErrorResponse_1 = require("./ErrorResponse");
const errorHandler = (error) => {
    const { FORBIDDEN, UNAUTHORISED, UNPROCESSABLE_ENTITY } = constants_1.statusCodes;
    // Log error in development mode
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error);
    }
    switch (error.name) {
        case 'SyntaxError':
            return new ErrorResponse_1.ErrorResponse({
                message: 'Something went wrong, please contact support.',
                statusCode: FORBIDDEN
            });
        case 'JsonWebTokenError':
            return new ErrorResponse_1.ErrorResponse({
                message: 'Not authorized to access this route',
                statusCode: UNAUTHORISED
            });
        case 'SequelizeValidationError':
            const validationError = error.errors[0];
            let errorMessage = validationError.message;
            if (validationError.type.includes('notNull')) {
                const path = validationError.path.charAt(0).toUpperCase() +
                    validationError.path.slice(1);
                errorMessage = `${path} is required.`;
            }
            return new ErrorResponse_1.ErrorResponse({
                message: errorMessage,
                statusCode: UNPROCESSABLE_ENTITY
            });
        case 'SequelizeUniqueConstraintError':
            const uniqueConstraintError = error.errors[0];
            const uniquePath = uniqueConstraintError.path;
            return new ErrorResponse_1.ErrorResponse({
                message: `${uniquePath.charAt(0).toUpperCase() + uniquePath.slice(1)} already exists.`,
                statusCode: UNPROCESSABLE_ENTITY
            });
        case 'TokenExpiredError':
            return new ErrorResponse_1.ErrorResponse({
                message: 'Session expired, please log in again.',
                statusCode: UNAUTHORISED
            });
        default:
            return error;
    }
};
exports.default = errorHandler;
