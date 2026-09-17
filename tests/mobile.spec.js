const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');
const { capturePageScreenshot } = require('../utils/helper.js');

test.describe('Mobile Testing Suite', () => {
    
    
    // Module 1: Home Page / Navigation Drawer
    test('TEST:001 [Home Module] => Verify Mobile Hamburger Menu opens, displays links, and closes', async ({mobilePage}) => {
        await mobilePage.gotoWebPage();
        await mobilePage.openHamburgerDrawer();
        await mobilePage.verifyDrawerLinks();
        await mobilePage.closeHamburgerDrawer();
    });

    // Module 2: Search Module
    test('TEST:002 [Search Module] => Verify Mobile Search functionality and results display', async ({mobilePage}) => {
        await mobilePage.gotoWebPage();
        await mobilePage.searchRecipeFromDrawer(testData.seacrhData.searchRecipe);
        await mobilePage.verifySearchResults();
    });

    // Module 3: Recipe Module (Using the one recipe)
    test('TEST:003 [Recipe Module] => Verify Recipe Page elements (Heading, Author,Ingredients)', async ({mobilePage}) => {
        await mobilePage.gotoWebPage();
        await mobilePage.navigateToRecipeFromHomePage();
        await mobilePage.verifyRecipeDetails();
        await mobilePage.openAuthorSubWindow();
    });

    // Module 4: Ingredients Module
    test('TEST:004 [Ingredients Module] => Verify Ingredients A-Z alphabetical jump navigation', async ({mobilePage}) => {
        await mobilePage.gotoWebPage();
        await mobilePage.navigateToIngredientsDirectory();
    });
});