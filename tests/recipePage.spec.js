const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');
const { capturePageScreenshot, captureElementScreenshot  } = require('../utils/helper.js');

test.describe('Recipe Page', () => {

    test('TEST:001 => Recipe Page assertions to verify the page elements are visible', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.verifyPageHeader(testData.recipePage.heading, testData.recipePage.authorName);
        await recipePage.verifyTimeSection();
        await recipePage.verifyIngredients();
        await recipePage.verifyDirections();
        await recipePage.verifyNutritionFacts();
        await recipePage.verifyStarRating();
        await recipePage.verifyRelatedRecipes();
        await recipePage.verifyFooter();
        await capturePageScreenshot(page, 'recipePage', 'Recipe_Page_Assertions');
    });

    test('TEST:002 => Verify Screen Awake Toggle is working', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.verifyScreenAwakeToggleWorking();
    });
    
    test('TEST:003 => Verify Breadcrumbs Functionality', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.verifyBreadcrumbsFunctionality(testData.recipePage['3rd_breadcrumb_page_heading']);
        await capturePageScreenshot(page, 'recipePage', 'Breadcrumbs_Functionality');
    });

    test('TEST:004 => Verify Recipe Ingredients Quantity', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.recipe_Ingredients_Quantity_Changer(testData.recipePage['recipe_Ingredients_multiplier']);
        await recipePage.verify_Ingredient_Quantity(testData.recipePage['recipe_Ingredients_Name'], testData.recipePage['recipe_Ingredients_Quantity']);
    });

    test('TEST:005 => Verify Print Recipe Button and URL Attribute', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.verifyPrintRecipeButton();
    });

    test('TEST:006 => Verify Rating and Review Bar Summary Details', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.verifyRatingAndReviewSummary();
    });

    test('TEST:007 => Verify Jump to Nutrition Facts Smooth-Scroll Navigation', async ({ homePage, recipePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateToRecipePage();
        await recipePage.verifyJumpToNutritionFacts();
    });
});