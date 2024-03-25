"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Password {
    static toHash(password) {
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const buffer = (0, crypto_1.scryptSync)(password, salt, 64);
        return `${buffer.toString('hex')}.${salt}`;
    }
    static compare(storedPassword, suppliedPassword) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buffer = (0, crypto_1.scryptSync)(suppliedPassword, salt, 64);
        return buffer.toString('hex') === hashedPassword;
    }
}
exports.default = Password;
