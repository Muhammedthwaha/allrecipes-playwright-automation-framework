const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');
const { capturePageScreenshot } = require('../utils/helper.js');

test.describe('Search Feature & Search Results Page Tests', () => {

    test('TEST:001 => Valid Search via Click on Search Button', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaClick(testData.seacrhData.searchRecipe);
        await expect(searchResultsPage.firstResultCard).toBeVisible();
        await expect(page).toHaveURL(/.*search\?q=Chicken(\+|%20)Parmesan/i);
        await capturePageScreenshot(page, 'searchResultsPage', 'Valid_Search_Click');
    });

    test('TEST:002 => Submit Search via Keyboard Enter Key', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaEnterKey(testData.seacrhData.keyboardRecipe);
        await expect(searchResultsPage.firstResultCard).toBeVisible();
        await expect(page).toHaveURL(/.*search\?q=Lasagna/i);
        await capturePageScreenshot(page, 'searchResultsPage', 'Keyboard_Enter_Search');
    });

    test('TEST:003 => Clear Search Bar Input via X Button on Results Page', async ({ searchResultsPage }) => {
        await searchResultsPage.gotoHomePage();
        // 1. Perform search to land on Search Results page
        await searchResultsPage.searchViaClick(testData.seacrhData.searchRecipe);
        await expect(searchResultsPage.firstResultCard).toBeVisible();

        // 2. Click the physical 'X' clear button inside the results page search box
        await searchResultsPage.clearResultsHeroSearchInput();
    });

    test('TEST:004 => Search with Special Characters (& symbol)', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaClick(testData.seacrhData.specialCharRecipe);
        await expect(searchResultsPage.firstResultCard).toBeVisible();
        await expect(page).toHaveURL(/.*search\?q=Mac.*Cheese/i);
        await capturePageScreenshot(page, 'searchResultsPage', 'Special_Character_Search');
    });

    test('TEST:005 => Verify Search Result Card Metadata (Title, Image, Rating, Review Count)', async ({ searchResultsPage }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaClick(testData.seacrhData.searchRecipe);
        await searchResultsPage.assertFirstCardMetadata();
    });

    test('TEST:006 => In-Page Re-Search from Search Results Page', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaClick(testData.seacrhData.searchRecipe);
        await expect(searchResultsPage.firstResultCard).toBeVisible();
        // Re-search directly from the results page without going back home
        await searchResultsPage.reSearchFromResultsPage(testData.seacrhData.reSearchRecipe);
        await expect(page).toHaveURL(/.*search\?q=Beef(\+|%20)Stew/i);
        await expect(searchResultsPage.firstResultCard).toBeVisible();
        await capturePageScreenshot(page, 'searchResultsPage', 'InPage_ReSearch');
    });

    test('TEST:007 => Invalid Search Query Displays No Results Header', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaClick(testData.seacrhData.invalidSearch);
        await expect(searchResultsPage.noResultsHeader).toBeVisible();
        await capturePageScreenshot(page, 'searchResultsPage', 'Invalid_Search_No_Results');
    });

    test('TEST:008 => Whitespace Search Displays No Results Header', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.searchViaClick(testData.seacrhData.whitespace);
        await expect(searchResultsPage.noResultsHeader).toBeVisible();
        await capturePageScreenshot(page, 'searchResultsPage', 'Whitespace_Search');
    });



    test('TEST:009 => Verify Popular Search Tag Navigation', async ({ searchResultsPage, page }) => {
        await searchResultsPage.gotoHomePage();
        await searchResultsPage.clickPopularSearchTag(testData.tagname.tag1);
        await expect(page).toHaveURL(new RegExp(`search\\?q=${testData.tagname.tag1}`, 'i'));
    });
});