const { test: base, expect } = require('@playwright/test');
const PoManager = require('../pages/PoManager');

// Extend base test with custom page object fixtures
const test = base.extend({
    // Fixture for PoManager
    poManager: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        await use(pomanager);
    },

    // 2. Page fixtures that DEPEND on poManager
    homePage: async ({ poManager }, use) => {        
        const homePage = poManager.getHomePage();
        await use(homePage);
    },
    recipePage: async ({ poManager }, use) => {      
        const recipePage = poManager.getRecipePage();
        await use(recipePage);
    },
    authorPage: async ({ poManager }, use) => {      
        const authorPage = poManager.getAuthorPage();
        await use(authorPage);
    },

    // About Us Page
    aboutUsPage: async ({ poManager }, use) => {
        const aboutUsPage = poManager.getAboutUsPage();
        await use(aboutUsPage);
    },

    // News Page
    newsPage: async ({ poManager }, use) => {
        const newsPage = poManager.getNewsPage();
        await use(newsPage);
    },

    // Fixture for IngredientsPage
    ingredientsPage: async ({ poManager }, use) => {
        const ingredientsPage = poManager.getIngredientsPage();
        await use(ingredientsPage);
    },

    // Fixture for SearchResultsPage 
    searchResultsPage: async ({ poManager }, use) => {
        const searchResultsPage = poManager.getSearchResultsPage();
        await use(searchResultsPage);
    },

    // Fixture for MobilePage
    mobilePage: async ({ poManager }, use) => {
        const mobilePage = poManager.getMobilePage();
        await use(mobilePage);
    },

});

// screenshot on failed tests
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenShotTilte = testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_');
        await page.screenshot({ path: `failed_tests_screenshots/${screenShotTilte}.png`, fullPage: true });
    }
});

module.exports = { test, expect };