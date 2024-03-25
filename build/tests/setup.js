"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
beforeAll(async () => {
    const pool = await (0, db_1.createDatabase)();
    pool && (await pool.end());
    process.exitCode = 0;
});
beforeEach(async () => {
    await db_1.migrator.up();
    process.exitCode = 0;
});
afterEach(async () => {
    await db_1.migrator.down({ to: 0 });
    process.exitCode = 0;
});
