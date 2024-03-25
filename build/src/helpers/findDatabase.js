"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDatabase = void 0;
const findDatabase = async (pool, name) => {
    const query = `
    SELECT datname 
    FROM pg_catalog.pg_database 
    WHERE lower(datname) = lower('${name}');
  `;
    return await pool.query(query);
};
exports.findDatabase = findDatabase;
