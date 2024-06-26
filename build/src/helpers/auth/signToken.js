"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const { secret, secretExpire } = config_1.config.jwt;
const signToken = (text) => jsonwebtoken_1.default.sign({ text }, secret, {
    expiresIn: secretExpire
});
exports.signToken = signToken;
