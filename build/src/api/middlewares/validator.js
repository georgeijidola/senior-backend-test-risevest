"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ErrorResponse_1 = require("../../managers/error/ErrorResponse");
const constants_1 = require("../../managers/constants");
const ajv = new ajv_1.default();
const validator = (options) => {
    return (req, res, next) => {
        const targets = ['body', 'params', 'query'];
        targets.forEach((target) => {
            if (options[target]) {
                const validateData = ajv.compile(options[target]);
                if (target === 'body' || target === 'params' || target === 'query') {
                    const isValid = validateData(req[target]);
                    if (!isValid) {
                        const { instancePath, message } = validateData.errors[0];
                        throw new ErrorResponse_1.ErrorResponse({
                            // Only an error per request
                            message: `${instancePath.charAt(1).toUpperCase() + instancePath.substring(2)} ${message}`,
                            statusCode: constants_1.statusCodes.UNPROCESSABLE_ENTITY
                        });
                    }
                }
            }
        });
        next();
    };
};
exports.validator = validator;
