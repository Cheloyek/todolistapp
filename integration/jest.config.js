module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    testEnvironmentOptions:{
        URL: "http://localhost"
    },
    // moduleNameMapper: {
    //     axios: "axios/dist/node/axios.cjs"
    // }

    // "jest": {
    //     verbose: true,
    //     testURL: "http://localhost/",
    // }
    // verbose: true,
    // testURL: "http://localhost/",
    // transformIgnorePatterns: [
    //     "/node_modules/(?!(uuid)/)"
    // ]
};
