const { defineConfig, expect, chromium, devices } = require('@playwright/test');


const config = defineConfig({
    globalSetup: './utils/globalSetup.js',
    testDir: './tests',
    timeout: 60*1000,
    workers: 2,
    retries: 1,
    fullyParallel: true,
    expect: {
        timeout: 5000
    },
    reporter:[
        ['html'],
        ['allure-playwright'],
        // Temporary allure report command: npx allure serve ./allure-results
        
        /* permanent allure report command
            # 1. Generate the HTML report folder
           npx allure generate ./allure-results --clean -o ./allure-report

            # 2. Open the generated report in browser
            npx allure open ./allure-report */
    ],
    projects: [

        // ==========================================
        // DESKTOP BROWSERS
        // ==========================================
        {
        name: 'chromium',
        testIgnore: /.*mobile.*\.spec\.js/,
            use: {
                browserName: 'chromium',
                headless: true,
                ignoreHTTPSErrors:true,
                screenshot: 'only-on-failure',
                trace: 'on',
                'video': 'on',
                ...devices['Desktop Chrome'],
            }
        },
        {
            name: 'firefox',
            testIgnore: /.*mobile.*\.spec\.js/,
            use: {
                browserName: 'firefox',
                headless: true,
                ignoreHTTPSErrors:true,
                screenshot: 'only-on-failure',
                trace: 'on',
                'video': 'on',
                ...devices['Desktop Firefox'],
            }
        },

        // ==========================================
        // MOBILE PROJECTS (Run ONLY mobile tests)
        // ==========================================
        // 1. Mobile Chrome (Android / Pixel 7)
        {
            name: 'Android',
            testMatch: /.*mobile.*\.spec\.js/, 
            use: {
                ...devices['Pixel 7'],
                browserName: 'chromium',
                headless: true,
                ignoreHTTPSErrors: true,
                screenshot: 'only-on-failure',
                trace: 'on',
                video: 'on',
            },
        },
        // 2. Mobile Safari (iOS / iPhone 14)
        {
            name: 'iPhone',
            testMatch: /.*mobile.*\.spec\.js/, 
            use: {
                ...devices['iPhone 14'],
                browserName: 'chromium',
                headless: true,
                ignoreHTTPSErrors: true,
                screenshot: 'only-on-failure',
                trace: 'on',
                video: 'on',
            },
        },
    ]
});
module.exports = config;

