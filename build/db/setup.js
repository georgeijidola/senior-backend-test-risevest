"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const setup = async () => {
    try {
        await (0, _1.createDatabase)();
        process.exitCode = 0;
    }
    catch (error) {
        console.error('Setup failed:', error);
        process.exitCode = 1;
    }
};
setup();
