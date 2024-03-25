"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = void 0;
const async_1 = require("../../middlewares/async");
const signUpService_1 = require("../../../services/signUpService");
const response_1 = require("../../../helpers/response");
const constants_1 = require("../../../managers/constants");
const signUpController = (0, async_1.asyncHandler)(async (req, res) => {
    const { username, password } = req.body;
    await (0, signUpService_1.signUpService)({
        username,
        password
    });
    return res.status(constants_1.statusCodes.CREATED).json(new response_1.ApiResponse({
        message: 'User registered.'
    }));
});
exports.signUpController = signUpController;
