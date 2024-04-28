const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions: { paths } } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  roots: [
    'src',
    'test'
  ],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: __dirname }),
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s'
  ],
  coveragePathIgnorePatterns: [
    'src/database'
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node'
};