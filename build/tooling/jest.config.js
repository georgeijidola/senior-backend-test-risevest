"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    rootDir: '../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    collectCoverage: false,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts']
};
exports.default = config;
