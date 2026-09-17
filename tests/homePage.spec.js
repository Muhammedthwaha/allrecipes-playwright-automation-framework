const testData = require('../testData/testData.json');
const { test, expect } = require('../fixtures/baseFixtures.js');
const { capturePageScreenshot, captureElementScreenshot, mouseScroll  } = require('../utils/helper.js');

test.describe('HomePage', () => {

    test('TEST:001 => Home Page assertions to verify the page elements are visible', async ({ homePage }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.navigateCarouselRightAndLeft();
        await homePage.flipRecipeCard();
    });

    test('TEST:002 => Navigate to Hamburger Menu', async ({ homePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await mouseScroll(page, 300);
        await homePage.navigateToHamburgerMenu();
    });

    test('TEST:003 => Navigate to Home Page from Header Logo', async ({ homePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.seachingOnSeachBar(testData.seacrhData.searchRecipe);
        await expect(page.locator('#mntl-card-list-card--extendable_1-0')).toBeVisible();
        await homePage.headerLogoReturnToHome();
        await homePage.homePageAssertions();
    });

    test('TEST:004 => Verify Footer Social Media Section', async ({ homePage }) => {
        await homePage.gotoWebPage();
        await homePage.verifyFooterSocialMediaSection(
            testData.socialMediaLinks.facebook, 
            testData.socialMediaLinks.instagram, 
            testData.socialMediaLinks.pinterest, 
            testData.socialMediaLinks.youtube);
    });

    test('TEST:005 => Top Category Navigation - Dinner Tonight', async ({ homePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.verifyTopCategoryNavigation(
            testData.topCategoryNavigation.dinnerTonightHeading, 
            testData.topCategoryNavigation.ingredientsHeading, 
            testData.topCategoryNavigation.communityHeading);
    });

    test('TEST:006 => Verify Hover Dropdown List Navigation', async ({ homePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.hoverOverNavHeadingAndGoTo_A_Sublist(testData.howerDropdownNavigation.mainHeading1, testData.howerDropdownNavigation.subHeading1);
        await homePage.hoverOverNavHeadingAndGoTo_A_Sublist(testData.howerDropdownNavigation.mainHeading2, testData.howerDropdownNavigation.subHeading2);
    });

    test('TEST:007 => Verify Newsletter Popup', async ({ homePage }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.verifyNewsletterPopup();
    });

    test('TEST:008 => Verify See More button in The Latest section', async ({ homePage, page }) => {
        await homePage.gotoWebPage();
        await homePage.homePageAssertions();
        await homePage.verifySeeMoreBtnOnLatestSection();
    });
});

