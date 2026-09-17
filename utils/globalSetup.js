const fs = require('fs');
const path = require('path');

async function globalSetup() {
    // List of folders to clean before each test execution
    const foldersToClean = [
        path.resolve(__dirname, '../allure-results'),
        path.resolve(__dirname, '../allure-report'),
        path.resolve(__dirname, '../screenshots'),
        path.resolve(__dirname, '../test-results'),
    ];

    for (const folder of foldersToClean) {
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true, force: true });
        }
    }
}

module.exports = globalSetup;