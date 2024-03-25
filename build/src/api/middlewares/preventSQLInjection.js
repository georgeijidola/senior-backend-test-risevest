"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventSQLInjection = void 0;
const ErrorResponse_1 = require("../../managers/error/ErrorResponse");
const constants_1 = require("../../managers/constants");
const hasSql = (value) => {
    // sql regex reference: http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
    const sqlRegex = [
        /(%27)|(')|(--)|(%23)|(#)/gi, // SQL meta-characters
        /((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))/gi, // Modified SQL meta-characters
        /((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/gi, // Typical SQL injection attack
        /((''|[^'])*')|(\)\;)|(--)|(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|VERSION|ORDER|UNION( +ALL){0,1})/gi // SQL keywords
    ];
    // Check if the value matches any SQL injection pattern
    return sqlRegex.some((regex) => regex.test(value));
};
const { FORBIDDEN } = constants_1.statusCodes;
const preventSQLInjection = (req, res, next) => {
    if (hasSql(req.originalUrl) || hasSql(JSON.stringify(req.body)))
        throw new ErrorResponse_1.ErrorResponse({
            message: 'Dirty request!',
            statusCode: FORBIDDEN
        });
    next();
};
exports.preventSQLInjection = preventSQLInjection;
