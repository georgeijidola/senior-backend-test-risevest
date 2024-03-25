"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getTopUsersController_1 = require("../controllers/users/getTopUsersController");
const getUsersController_1 = require("../controllers/users/getUsersController");
const getPostsByUserController_1 = require("../controllers/posts/getPostsByUserController");
const createPostController_1 = require("../controllers/posts/createPostController");
const validator_1 = require("../middlewares/validator");
const createPost_schema_1 = require("../schema/createPost.schema");
const protect_1 = require("../middlewares/protect");
const getPostsByUser_schema_1 = require("../schema/getPostsByUser.schema");
const router = (0, express_1.Router)();
router.get('/', protect_1.protect, getUsersController_1.getUsersController);
router
    .route('/:id/posts')
    .get((0, validator_1.validator)(getPostsByUser_schema_1.getPostsByUser), protect_1.protect, getPostsByUserController_1.getPostsByUserController)
    .post((0, validator_1.validator)(createPost_schema_1.createPost), protect_1.protect, createPostController_1.createPostController);
router.get('/top-users', protect_1.protect, getTopUsersController_1.getTopUsersController);
exports.default = router;
