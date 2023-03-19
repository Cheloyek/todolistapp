module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    testEnvironmentOptions:{
        URL: "http://localhost"
    }
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
