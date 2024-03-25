"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = void 0;
const signInSchema = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string', minLength: 1 },
            password: { type: 'string', minLength: 1 }
        },
        required: ['username', 'password'],
        additionalProperties: false
    }
};
exports.signInSchema = signInSchema;
