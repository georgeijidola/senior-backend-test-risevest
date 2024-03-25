"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByUser = void 0;
const getPostsByUser = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', minLength: 32, maxLength: 36 }
        },
        required: ['id'],
        additionalProperties: false
    }
};
exports.getPostsByUser = getPostsByUser;
