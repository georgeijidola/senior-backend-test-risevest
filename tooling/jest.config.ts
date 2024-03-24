import type { Config } from 'jest'

const config: Config = {
  rootDir: '../',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts']
  // testTimeout: 10000
}

export default config
