const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');

test.describe('Authors profile Page', () => {

    test('TEST:001 => Full User Journey: Navigate from Recipe Page to Author Profile', async ({ homePage, recipePage, authorPage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();

        await recipePage.navigateToAuthorProfile();
        await authorPage.verifyAuthorNameAndBio(testData.authorNames.author1);
        await authorPage.verifyAuthorRecipeCatalog();
        await authorPage.clickFirstRecipe(testData.authorDishName.dish1);
    });

    // Parameterized Data-Driven Test: Dynamically creates a test for each author in testData.json
    for (const author of testData.authorsList) {
        test(`TEST:002 => Data-Driven Author Profile Verification: ${author.expectedTitle}`, async ({ authorPage, page }) => {
            await authorPage.gotoAuthorPage(author.url);
            await authorPage.verifyAuthorProfileDetails(author.name);
        });
    }
    
});