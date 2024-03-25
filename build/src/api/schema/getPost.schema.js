"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = void 0;
const getPost = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', minLength: 32, maxLength: 36 }
        },
        required: ['id'],
        additionalProperties: false
    }
};
exports.getPost = getPost;
