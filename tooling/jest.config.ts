import type { Config } from 'jest'

const config: Config = {
  rootDir: '../',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  coveragePathIgnorePatterns: ['/node_modules/']
  // collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts']
}

export default config
