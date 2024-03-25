"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const signUpService_1 = require("../src/services/signUpService");
const signInService_1 = require("../src/services/signInService");
const getUsersService_1 = require("../src/services/getUsersService");
const createPostService_1 = require("../src/services/createPostService");
const getPostsService_1 = require("../src/services/getPostsService");
const getPostsByUserService_1 = require("../src/services/getPostsByUserService");
const addCommentService_1 = require("../src/services/addCommentService");
const getTopUsersService_1 = require("../src/services/getTopUsersService");
const getPostService_1 = require("../src/services/getPostService");
describe('Unit tests for services', () => {
    /**
     * Sign up
     */
    it('Sign up', async () => {
        const userData = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        const result = await (0, signUpService_1.signUpService)(userData);
        expect(result).toHaveProperty('id');
    });
    /**
     * Sign in
     */
    it('Sign in', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const result = await (0, signInService_1.signInService)(credentials);
        expect(result).toHaveProperty('username');
    });
    /**
     * Get Users
     */
    it('Get Users', async () => {
        const createRandomUser = () => {
            return {
                username: faker_1.faker.internet.userName(),
                password: faker_1.faker.internet.password()
            };
        };
        const usersData = faker_1.faker.helpers.multiple(createRandomUser, {
            count: 2
        });
        await Promise.all([
            (0, signUpService_1.signUpService)(usersData[0]),
            (0, signUpService_1.signUpService)(usersData[1])
        ]);
        const result = await (0, getUsersService_1.getUsersService)();
        expect(result[0]).toHaveProperty('username');
    });
    /**
     * Create Posts
     */
    it('Create Post', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const { id } = (await (0, getUsersService_1.getUsersService)())[0];
        const postData = {
            title: faker_1.faker.word.words(3),
            content: faker_1.faker.word.words(10),
            user_id: id
        };
        const result = await (0, createPostService_1.createPostService)(postData);
        expect(result).toHaveProperty('title', postData.title);
    });
    /**
     * Get Posts
     */
    it('Get Posts', async () => {
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
        const result = await (0, getPostsService_1.getPostsService)();
        expect(result[0]).toHaveProperty('title');
    });
    /**
     * Get Post
     */
    it('Get Post', async () => {
        const credentials = {
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password()
        };
        await (0, signUpService_1.signUpService)(credentials);
        const user = (await (0, getUsersService_1.getUsersService)())[0];
        const { id } = await (0, createPostService_1.createPostService)({
            user_id: user.id,
            title: faker_1.faker.word.words(3),
            content: faker_1.faker.word.words(10)
        });
        const result = await (0, getPostService_1.getPostService)(id);
        expect(result).toHaveProperty('title');
    });
    /**
     * Get Posts By User
     */
    it('Get Posts By User', async () => {
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
        // TODO: Add comments for each post
        const result = await (0, getPostsByUserService_1.getPostsByUserService)(user.id);
        expect(result[0]).toHaveProperty('title');
    });
    /**
     * Add comment to a post
     */
    it('Add comment to a post', async () => {
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
        const commentData = {
            postId: post.id,
            userId: commenter.id,
            content: faker_1.faker.word.words(5)
        };
        const comment = await (0, addCommentService_1.addCommentService)(commentData);
        expect(comment).toHaveProperty('content', commentData.content);
    });
    /**
     * Get top Users, sorted by most posts and with their latest comment
     */
    it('Get top Users', async () => {
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
        const [postOne] = await Promise.all([
            (0, createPostService_1.createPostService)({ user_id: topUser.id, ...postsData[0] }),
            (0, createPostService_1.createPostService)({ user_id: topUser.id, ...postsData[1] }),
            (0, createPostService_1.createPostService)({ user_id: topUser.id, ...postsData[2] }),
            (0, createPostService_1.createPostService)({ user_id: regularUserOne.id, ...postsData[3] }),
            (0, createPostService_1.createPostService)({ user_id: regularUserOne.id, ...postsData[4] }),
            (0, createPostService_1.createPostService)({ user_id: regularUserTwo.id, ...postsData[5] })
        ]);
        const addComments = [
            (0, addCommentService_1.addCommentService)({
                postId: postOne.id,
                userId: topUser.id,
                content: faker_1.faker.word.words(5)
            }),
            (0, addCommentService_1.addCommentService)({
                postId: postOne.id,
                userId: regularUserOne.id,
                content: faker_1.faker.word.words(5)
            }),
            (0, addCommentService_1.addCommentService)({
                postId: postOne.id,
                userId: regularUserTwo.id,
                content: faker_1.faker.word.words(5)
            })
        ];
        await Promise.all(addComments);
        const result = await (0, getTopUsersService_1.getTopUsersService)();
        expect(result[0].id).toBe(topUser.id);
        expect(result[0].latestComment).toHaveProperty('id');
        expect(result.length).toBe(3);
    });
});
