"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const constants_1 = require("../src/managers/constants");
const faker_1 = require("@faker-js/faker");
const express_1 = require("../src/loaders/express");
const signUpService_1 = require("../src/services/signUpService");
const signToken_1 = require("../src/helpers/auth/signToken");
const getUsersService_1 = require("../src/services/getUsersService");
const createPostService_1 = require("../src/services/createPostService");
describe('Integration tests', () => {
    const { SUCCESS, CREATED } = constants_1.statusCodes;
    /**
     * Sign up
     */
    it('Sign up - POST /api/auth/sign-up', async () => {
        const credentials = {
            username: 'john.doe',
            password: 'ls0m3th1ng!'
        };
        const response = await (0, supertest_1.default)(express_1.app)
            .post('/api/auth/sign-up')
            .send(credentials);
        expect(response.status).toBe(CREATED);
        expect(response.body).toHaveProperty('message');
    });
    /**
     * Sign in
     */
    it('Sign in - POST /api/auth/sign-in', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const response = await (0, supertest_1.default)(express_1.app)
            .post('/api/auth/sign-in')
            .send(credentials);
        expect(response.status).toBe(SUCCESS);
        expect(response.body).toHaveProperty('token');
    });
    /**
     * Get Users
     */
    it('Get Users - GET /api/users', async () => {
        const createRandomUser = () => {
            return {
                username: faker_1.faker.internet.userName(),
                password: faker_1.faker.internet.password()
            };
        };
        const usersData = faker_1.faker.helpers.multiple(createRandomUser, {
            count: 2
        });
        const [firstUser] = await Promise.all([
            (0, signUpService_1.signUpService)(usersData[0]),
            (0, signUpService_1.signUpService)(usersData[1])
        ]);
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(firstUser.id);
        const response = await (0, supertest_1.default)(express_1.app)
            .get('/api/users')
            .set('Authorization', bearerToken);
        expect(response.status).toBe(SUCCESS);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
    /**
     * Create Post
     */
    it('Create Post - POST /api/users/${user.id}/posts', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        const firstUser = await (0, signUpService_1.signUpService)(credentials);
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(firstUser.id);
        const postData = {
            title: faker_1.faker.word.words(3),
            content: faker_1.faker.word.words(10)
        };
        const response = await (0, supertest_1.default)(express_1.app)
            .post(`/api/users/${firstUser.id}/posts`)
            .set('Authorization', bearerToken)
            .send(postData);
        expect(response.status).toBe(CREATED);
        expect(response.body.data).toHaveProperty('title', postData.title);
    });
    /**
     * Get Posts
     */
    it('Get Posts - GET /api/posts', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const user = (await (0, getUsersService_1.getUsersService)())[0];
        const createRandomPost = () => {
            return {
                user_id: user.id,
                title: faker_1.faker.word.words(3),
                content: faker_1.faker.word.words(10)
            };
        };
        const postsData = faker_1.faker.helpers.multiple(createRandomPost, {
            count: 2
        });
        await Promise.all([
            (0, createPostService_1.createPostService)(postsData[0]),
            (0, createPostService_1.createPostService)(postsData[1])
        ]);
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(user.id);
        const response = await (0, supertest_1.default)(express_1.app)
            .get('/api/posts')
            .set('Authorization', bearerToken);
        expect(response.status).toBe(SUCCESS);
        expect(response.body.data.length).toBe(2);
    });
    /**
     * Get Posts
     */
    it('Get Post - GET /api/posts/:id', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const user = (await (0, getUsersService_1.getUsersService)())[0];
        const createRandomPost = () => {
            return {
                user_id: user.id,
                title: faker_1.faker.word.words(3),
                content: faker_1.faker.word.words(10)
            };
        };
        const postsData = faker_1.faker.helpers.multiple(createRandomPost, {
            count: 2
        });
        const [firstPost] = await Promise.all([
            (0, createPostService_1.createPostService)(postsData[0]),
            (0, createPostService_1.createPostService)(postsData[1])
        ]);
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(user.id);
        const response = await (0, supertest_1.default)(express_1.app)
            .get(`/api/posts/${firstPost.id}`)
            .set('Authorization', bearerToken);
        expect(response.status).toBe(SUCCESS);
        expect(response.body.data).toHaveProperty('title');
    });
    /**
     * Get Posts By User
     */
    it('Get Posts By User - GET /api/users/${user.id}/posts', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const user = (await (0, getUsersService_1.getUsersService)())[0];
        const createRandomPost = () => {
            return {
                user_id: user.id,
                title: faker_1.faker.word.words(3),
                content: faker_1.faker.word.words(10)
            };
        };
        const postsData = faker_1.faker.helpers.multiple(createRandomPost, {
            count: 2
        });
        await Promise.all([
            (0, createPostService_1.createPostService)(postsData[0]),
            (0, createPostService_1.createPostService)(postsData[1])
        ]);
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(user.id);
        const response = await (0, supertest_1.default)(express_1.app)
            .get(`/api/users/${user.id}/posts`)
            .set('Authorization', bearerToken);
        expect(response.status).toBe(SUCCESS);
        expect(response.body.data.length).toBe(2);
        expect(response.body.data[0]).toHaveProperty('title');
    });
    /**
     * Add comment to a post
     */
    it('Add comment - POST /api/posts/${post.id}/comments', async () => {
        const createRandomUser = () => {
            return {
                username: faker_1.faker.internet.userName(),
                password: faker_1.faker.internet.password()
            };
        };
        const usersData = faker_1.faker.helpers.multiple(createRandomUser, {
            count: 2
        });
        const users = await Promise.all([
            (0, signUpService_1.signUpService)(usersData[0]),
            (0, signUpService_1.signUpService)(usersData[1])
        ]);
        const poster = users[0];
        const commenter = users[1];
        const post = await (0, createPostService_1.createPostService)({
            title: faker_1.faker.word.words(3),
            content: faker_1.faker.word.words(10),
            user_id: poster.id
        });
        const content = faker_1.faker.word.words(5);
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(commenter.id);
        const response = await (0, supertest_1.default)(express_1.app)
            .post(`/api/posts/${post.id}/comments`)
            .set('Authorization', bearerToken)
            .send({ content });
        expect(response.status).toBe(CREATED);
        expect(response.body.data).toHaveProperty('content', content);
    });
    /**
     * Get top Users, sorted by most posts and with their latest comment
     */
    it('Get top 3 Users - GET /api/top-users', async () => {
        const createRandomUser = () => {
            return {
                username: faker_1.faker.internet.userName(),
                password: faker_1.faker.internet.password()
            };
        };
        const usersData = faker_1.faker.helpers.multiple(createRandomUser, {
            count: 3
        });
        const [topUser, regularUserOne, regularUserTwo] = await Promise.all([
            (0, signUpService_1.signUpService)(usersData[0]),
            (0, signUpService_1.signUpService)(usersData[1]),
            (0, signUpService_1.signUpService)(usersData[2])
        ]);
        const createRandomPost = () => {
            return {
                title: faker_1.faker.word.words(3),
                content: faker_1.faker.word.words(10)
            };
        };
        const postsData = faker_1.faker.helpers.multiple(createRandomPost, {
            count: 6
        });
        await Promise.all([
            (0, createPostService_1.createPostService)({ user_id: topUser.id, ...postsData[0] }),
            (0, createPostService_1.createPostService)({ user_id: topUser.id, ...postsData[1] }),
            (0, createPostService_1.createPostService)({ user_id: topUser.id, ...postsData[2] }),
            (0, createPostService_1.createPostService)({ user_id: regularUserOne.id, ...postsData[3] }),
            (0, createPostService_1.createPostService)({ user_id: regularUserOne.id, ...postsData[4] }),
            (0, createPostService_1.createPostService)({ user_id: regularUserTwo.id, ...postsData[5] })
        ]);
        const anyUser = (await (0, getUsersService_1.getUsersService)())[0];
        const bearerToken = 'Bearer ' + (0, signToken_1.signToken)(anyUser.id);
        const response = await (0, supertest_1.default)(express_1.app)
            .get('/api/users/top-users')
            .set('Authorization', bearerToken);
        expect(response.status).toBe(SUCCESS);
        expect(response.body.data.length).toBe(3);
        expect(response.body.data[0].id).toBe(topUser.id);
    });
});
