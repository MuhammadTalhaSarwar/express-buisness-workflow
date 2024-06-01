module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
