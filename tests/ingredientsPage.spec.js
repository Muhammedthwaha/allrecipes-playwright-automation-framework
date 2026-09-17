const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');
const { capturePageScreenshot } = require('../utils/helper.js');

test.describe('Ingredients A-Z Directory Page', () => {

    test('TEST:001 => Verify Ingredients A-Z navigation, letter jumping, and recipe selection', async ({ homePage, ingredientsPage, page }) => {

        // 1. Start from Homepage
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();

        // 2. Navigate to Ingredients A-Z and assert directory layout
        await ingredientsPage.navigateToIngredientsPage(testData.ingredientsPage.expectedHeading);

        // 3. Jump to letter "C"
        await ingredientsPage.jumpToLetterSection(testData.ingredientsPage.targetLetter);

        // 4. Click "Chicken" and verify its recipe page loads
        await ingredientsPage.selectIngredientAndVerifyRecipes(testData.ingredientsPage.targetIngredient);

        // 5. Capture screenshot of the final recipe page
        await capturePageScreenshot(page, 'ingredientsPage', 'Chicken_Recipes_Page');
    });

    test('TEST:002 => Verify Hero Search on Ingredients Directory Page', async ({ homePage, ingredientsPage, page }) => {
        await homePage.gotoWebPage();
        await ingredientsPage.navigateToIngredientsPage(testData.ingredientsPage.expectedHeading);
        await ingredientsPage.searchIngredientFromDirectory(testData.ingredientsPage.searchItem);
        await capturePageScreenshot(page, 'ingredientsPage', 'Search_Bar_Searching_Results');
    });

    test('TEST:003 => Verify Active vs Disabled Alphabet Buttons State', async ({ homePage, ingredientsPage }) => {
        await homePage.gotoWebPage();
        await ingredientsPage.navigateToIngredientsPage(testData.ingredientsPage.expectedHeading);
        // "A" has recipes (active), "E" has no recipes (disabled)
        await ingredientsPage.verifyAlphabetLettersState('A', 'E');
    });

    test('TEST:004 => Verify ALL Letter Sections from A to Z Are Alphabetically Sorted', async ({ homePage, ingredientsPage }) => {
        await homePage.gotoWebPage();
        await ingredientsPage.navigateToIngredientsPage(testData.ingredientsPage.expectedHeading);

        // Verifies A, B, C, D ... all the way to W!
        await ingredientsPage.verifyAllLetterGroupsAreSorted();
    });
});