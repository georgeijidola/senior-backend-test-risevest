"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpService = void 0;
const models_1 = require("../models");
const signUpService = async ({ username, password }) => {
    const newUser = await models_1.User.create({
        username,
        password
    });
    return newUser;
};
exports.signUpService = signUpService;
