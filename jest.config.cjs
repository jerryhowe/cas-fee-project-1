// jest.config.cjs
module.exports = {
    // transform: {
    //     '^.+\\.[t|j|mj]s?$': 'babel-jest',
    // },
    verbose: true,
    moduleFileExtensions: [
        "js",
        "mjs",
    ],
    "transform": {
        "\\.m?jsx?$": "jest-esm-transformer"
    },
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/__tests__/**/*.mjs",
        "**/?(*.)+(spec|test).[jt]s?(x)",
        "**/?(*.)+(spec|test).mjs"]
}
