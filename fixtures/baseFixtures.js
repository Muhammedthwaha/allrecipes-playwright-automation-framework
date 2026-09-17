const { test: base, expect } = require('@playwright/test');
const PoManager = require('../pages/PoManager');

// Extend base test with custom page object fixtures
const test = base.extend({
    // Fixture for PoManager
    poManager: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        await use(pomanager);
    },

    // Fixture for HomePage
    homePage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const homePage = pomanager.getHomePage();
        await use(homePage);
    },

    // Fixture for RecipePage
    recipePage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const recipePage = pomanager.getRecipePage();
        await use(recipePage);
    },

    // Fixture for AuthorPage
    authorPage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const authorPage = pomanager.getAuthorPage();
        await use(authorPage);
    },

    // About Us Page
    aboutUsPage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const aboutUsPage = pomanager.getAboutUsPage();
        await use(aboutUsPage);
    },

    // News Page
    newsPage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const newsPage = pomanager.getNewsPage();
        await use(newsPage);
    },

    // Fixture for IngredientsPage
    ingredientsPage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const ingredientsPage = pomanager.getIngredientsPage();
        await use(ingredientsPage);
    },

    // Fixture for SearchResultsPage 
    searchResultsPage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const searchResultsPage = pomanager.getSearchResultsPage();
        await use(searchResultsPage);
    },

    // Fixture for MobilePage
    mobilePage: async ({ page }, use) => {
        const pomanager = new PoManager(page);
        const mobilePage = pomanager.getMobilePage();
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