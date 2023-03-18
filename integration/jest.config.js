module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js'],
    testURL: "http://localhost/"
    // transformIgnorePatterns: [
    //     "/node_modules/(?!(uuid)/)"
    // ]
};
