"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const createPost = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', minLength: 1 },
            content: { type: 'string', minLength: 1 }
        },
        required: ['title', 'content'],
        additionalProperties: false
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'string', minLength: 32, maxLength: 36 }
        },
        required: ['id'],
        additionalProperties: false
    }
};
exports.createPost = createPost;
